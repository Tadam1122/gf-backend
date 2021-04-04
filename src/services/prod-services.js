import puppeteer from 'puppeteer'
import { ObjectId } from 'mongodb'
import { connectClient } from '../db/connect'
const cliProgress = require('cli-progress')

export async function scrapePrices() {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log('updating product prices...')

  //get all product data
  let eGuitars = await db.collection('electric-guitars').find({}).toArray()
  let aGuitars = await db.collection('acoustic-guitars').find({}).toArray()
  let eAmps = await db.collection('electric-amps').find({}).toArray()
  let aAmps = await db.collection('acoustic-amps').find({}).toArray()
  let pedals = await db.collection('effect-pedals').find({}).toArray()

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

  const browser = await puppeteer.launch()
  // const browser = await puppeteer.launch({ headless: false, devtools: true }) //debug browser

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  )

  await page.setDefaultNavigationTimeout(0)
  // page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))

  console.log('Updating electric guitar prices...')
  eGuitarBar.start(eGuitars.length, 0)

  for (let i = 0; i < eGuitars.length; i++) {
    let eGuitar = { ...eGuitars[i] }
    delete eGuitar._id
    const eGuitarId = eGuitars[i]._id.$oid

    for (let j = 0; j < eGuitar.prices.length; j++) {
      let price
      if (eGuitar.prices[j].website === 'American Musical Supply') {
        price = await require(`../../prod/services/scrape-services`)[
          `priceAMS`
        ](eGuitar.prices[j].url, page)
      }
      //   if (eGuitar.prices[j].website === 'Sweetwater') {
      //     price = priceSweetwater(store.url, page)
      //   }
      //   if (eGuitar.prices[j].website === 'Musicians Friend') {
      //     price = priceMF(store.url, page)
      //   }
      if (price) eGuitar.prices[j].price = price
    }
    await db
      .collection('electric-guitars')
      .updateOne({ _id: ObjectId(eGuitarId) }, { $set: eGuitar })
    eGuitarBar.increment()
  }
  eGuitarBar.stop()

  console.log('Updating acoustic guitar prices...')
  aGuitarBar.start(aGuitars.length, 0)

  for (let i = 0; i < aGuitars.length; i++) {
    let aGuitar = { ...aGuitars[i] }
    delete aGuitar._id
    const aGuitarId = eGuitars[i]._id.$oid

    for (let j = 0; j < aGuitar.prices.length; j++) {
      let price
      if (aGuitar.prices[j].website === 'American Musical Supply') {
        price = await require(`../../prod/services/scrape-services`)[
          `priceAMS`
        ](aGuitar.prices[j].url, page)
      }
      //   if (aGuitar.prices[j].website === 'Sweetwater') {
      //     price = priceSweetwater(store.url, page)
      //   }
      //   if (aGuitar.prices[j].website === 'Musicians Friend') {
      //     price = priceMF(store.url, page)
      //   }
      if (price) aGuitar.prices[j].price = price
    }
    await db
      .collection('acoustic-guitars')
      .updateOne({ _id: ObjectId(aGuitarId) }, { $set: aGuitar })
    aGuitarBar.increment()
  }
  aGuitarBar.stop()

  console.log('Updating electric amplifier prices...')
  eAmpBar.start(eAmps.length, 0)
  let count = 0

  for (let i = 0; i < eAmps.length; i++) {
    let eAmp = { ...eAmps[i] }
    delete eAmp._id
    const eAmpId = eAmps[i]._id.$oid

    for (let j = 0; j < eAmp.prices.length; j++) {
      let price
      if (eAmp.prices[j].website === 'American Musical Supply') {
        price = await require(`./scrape-services`)[`priceAMS`](
          eAmp.prices[j].url,
          page
        )
      }
      //   if (eAmp.prices[j].website === 'Sweetwater') {
      //     price = priceSweetwater(store.url, page)
      //   }
      //   if (eAmp.prices[j].website === 'Musicians Friend') {
      //     price = priceMF(store.url, page)
      //   }
      if (price) eAmp.prices[j].price = price
    }
    await db
      .collection('electric-amps')
      .updateOne({ _id: ObjectId(eAmpId) }, { $set: eAmp })
    eAmpBar.increment()
  }
  eAmpBar.stop()

  console.log('Updating acoustic amplifier prices...')
  aAmpBar.start(aAmps.length, 0)

  for (let i = 0; i < aAmps.length; i++) {
    let aAmp = { ...aAmps[i] }
    delete aAmp._id
    const aAmpId = aAmps[i]._id.$oid

    for (let j = 0; j < aAmp.prices.length; j++) {
      let price
      if (aAmp.prices[j].website === 'American Musical Supply') {
        price = await require(`../../prod/services/scrape-services`)[
          `priceAMS`
        ](aAmp.prices[j].url, page)
      }
      //   if (aAmp.prices[j].website === 'Sweetwater') {
      //     price = priceSweetwater(store.url, page)
      //   }
      //   if (aAmp.prices[j].website === 'Musicians Friend') {
      //     price = priceMF(store.url, page)
      //   }
      if (price) aAmp.prices[j].price = price
    }
    await db
      .collection('acoustic-amps')
      .updateOne({ _id: ObjectId(aAmpId) }, { $set: aAmp })
    aAmpBar.increment()
  }
  aAmpBar.stop()

  console.log('Updating effect pedal prices...')
  pedalBar.start(pedals.length, 0)

  for (let i = 0; i < pedals.length; i++) {
    let pedal = { ...pedals[i] }
    delete pedal._id
    const pedalId = pedals[i]._id.$oid

    for (let j = 0; j < pedal.prices.length; j++) {
      let price
      if (pedal.prices[j].website === 'American Musical Supply') {
        price = await require(`../../prod/services/scrape-services`)[
          `priceAMS`
        ](pedal.prices[j].url, page)
      }
      //   if (pedal.prices[j].website === 'Sweetwater') {
      //     price = priceSweetwater(store.url, page)
      //   }
      //   if (pedal.prices[j].website === 'Musicians Friend') {
      //     price = priceMF(store.url, page)
      //   }
      if (price) pedal.prices[j].price = price
    }
    await db
      .collection('effect-pedals')
      .updateOne({ _id: ObjectId(pedalId) }, { $set: pedal })
    pedalBar.increment()
  }
  pedalBar.stop()

  await browser.close()
}
