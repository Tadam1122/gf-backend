import puppeteer from 'puppeteer'
import { ObjectId } from 'mongodb'
import { connectClient } from '../db/connect'
const cliProgress = require('cli-progress')

export async function scrapePrices() {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  const eGuitarBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )
  const aGuitarBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )
  const aAmpBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )
  const eAmpBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )
  const pedalBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )

  console.log('updating product prices...')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  // const browser = await puppeteer.launch({ headless: false, devtools: true }) //debug browser

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  )

  await page.setDefaultNavigationTimeout(0)
  // page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))

  const eGuitars = await db.collection('electric-guitars').find({}).toArray()

  console.log('Updating electric guitar prices...')
  await scrapeProducts(eGuitars, 'electric-guitars', eGuitarBar, page, db)

  const aGuitars = await db.collection('acoustic-guitars').find({}).toArray()

  console.log('Updating acoustic guitar prices...')
  await scrapeProducts(aGuitars, 'acoustic-guitars', aGuitarBar, page, db)

  const eAmps = await db.collection('electric-amps').find({}).toArray()

  console.log('Updating electric amplifier prices...')
  await scrapeProducts(eAmps, 'electric-amps', eAmpBar, page, db)

  const aAmps = await db.collection('acoustic-amps').find({}).toArray()

  console.log('Updating acoustic amplifier prices...')
  await scrapeProducts(aAmps, 'acoustic-amps', aAmpBar, page, db)

  const pedals = await db.collection('effect-pedals').find({}).toArray()

  console.log('Updating effect pedal prices...')
  await scrapeProducts(pedals, 'effect-pedals', pedalBar, page, db)

  await browser.close()
}

async function scrapeProducts(products, tableName, productBar, page, db) {
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
      if (price) product.prices[j].price = price
    }
    product.inStock = inStock
    await db
      .collection(tableName)
      .updateOne({ _id: ObjectId(productId) }, { $set: product })

    productBar.increment()
  }
  productBar.stop()
}
