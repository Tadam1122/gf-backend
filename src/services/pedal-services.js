import puppeteer from 'puppeteer'
import { ObjectId } from 'mongodb'
import cliProgress from 'cli-progress'
import { connectClient } from '../db/connect'
import { getLowestNumber, priceToNumber } from '../utilities/priceUtil'
import { updateWishlists } from './wishlistService'

async function scrapePrices() {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  const pedalBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )

  console.log('updating product prices...')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(0)

  const pedals = await db.collection('effect-pedals').find({}).toArray()

  console.log('Updating effect pedal prices...')
  await scrapeProducts(pedals, 'effect-pedals', page, db, pedalBar)
  console.log('Effect pedal prices updated.')

  await client.close()

  let pages = await browser.pages()
  await Promise.all(pages.map((page) => page.close()))
  await browser.close()
}

async function scrapeProducts(products, tableName, page, db, productBar) {
  productBar.start(products.length, 0)
  for (let i = 0; i < products.length; i++) {
    let product = { ...products[i] }
    delete product._id
    const productId = products[i]._id

    let inStock = false
    for (let j = 0; j < product.prices.length; j++) {
      let price
      if (product.prices[j].website === 'American Musical Supply') {
        let data = await require(`../../prod/services/scrape-services`)[
          `priceAMS`
        ](product.prices[j].url, page)

        product.prices[j].inStock = data.inStock
        price = data.price
        inStock = inStock ? inStock : data.inStock
      }
      if (product.prices[j].website === 'Sweetwater') {
        if (product.prices[j].url) {
          let data = await require(`../../prod/services/scrape-services`)[
            `priceSweetwater`
          ](product.prices[j].url, page)

          product.prices[j].inStock = data.inStock
          price = data.price
          inStock = inStock ? inStock : data.inStock
        }
      }
      if (product.prices[j].website === 'Musicians Friend') {
        if (product.prices[j].url) {
          let data = await require(`../../prod/services/scrape-services`)[
            `priceMF`
          ](product.prices[j].url, page)

          product.prices[j].inStock = data.inStock
          price = data.price
          inStock = inStock ? inStock : data.inStock
        }
      }
      if (price) {
        //update new product price
        product.prices[j].price = price

        //update wishlists with products
        let priceNum = priceToNumber(price)
        let lowestPrices = getLowestNumber(product.prices)
        if (priceNum < lowestPrices) {
          let priceDiff = lowestPrices - priceNum
          updateWishlists(db, priceDiff, productId)
        }
      }
    }
    product.inStock = inStock
    await db
      .collection(tableName)
      .updateOne({ _id: ObjectId(productId) }, { $set: product })
    productBar.increment()
  }
  productBar.stop()
}

scrapePrices()
