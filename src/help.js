import puppeteer from 'puppeteer'
import { connectClient } from './db/connect'
import { ObjectId } from 'mongodb'

async function main() {
  let eGuitars = [
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c114b',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/chapman-ml3-rabea-massaad-baritone-guitar/p/CHP-ML3BEAB-LIST',
          price: '$1849',
        },
        {
          website: 'Sweetwater',
          url: '',
          price: '',
        },
        {
          website: 'Musicians Friend',
          url: '',
          price: '',
        },
      ],
      fretNum: '22',
      brand: 'Chapman',
      model: 'ML3 Rabea Massaad Baritone Guitar',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: 'Wenge',
      scaleLen: '28"',
      fretboard: 'Wenge',
      frets: 'Jumbo Stainless Steel',
      pickupConfig: 'HS',
      coilTap: false,
      coilSplit: false,
      neckConstruction: 'Bolt On',
      bridge: 'Hipshot Hardtail',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c114c',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/chapman-ml1-modern-baritone-guitar/p/CHP-ML1MODB-LIST',
          price: '$579',
        },
        {
          website: 'Sweetwater',
          url: '',
          price: '',
        },
        {
          website: 'Musicians Friend',
          url:
            'https://www.musiciansfriend.com/guitars/chapman-ml1-modern-v2-baritone-electric-guitar/l48611000003000?rNtt=Chapman%20ML1%20Modern%20Barione&index=1',
          price: '$579',
        },
      ],
      fretNum: '24',
      brand: 'Chapman',
      model: 'ML1 Modern Baritone Guitar',
      bodyConfig: 'Solid Body',
      inStock: true,
      neckWood: 'Maple',
      scaleLen: '28"',
      fretboard: 'Macassar Ebony',
      frets: 'Jumbo Nickel Frets',
      pickupConfig: 'HH',
      coilTap: false,
      coilSplit: false,
      neckConstruction: 'Bolt On',
      bridge: 'Hardtail',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c114d',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/prs-se-277-baritone-electric-guitar/p/PRS-SE277-LIST',
          price: '$779',
        },
      ],
      fretNum: '22',
      brand: 'PRS',
      model: 'SE 277 Baritone Charcoal Burst',
      bodyConfig: 'Solid Body',
      inStock: false,
      scaleLen: '27.7 inches',
      coilTap: false,
      coilSplit: false,
      bridge: 'PRS-Designed Plate-Style Bridge, String Through',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c114e',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/gretsch-g5260-electromatic-jet-baritone-with-v-stoptail/p/GRE-2516002-LIST',
          price: '$599',
        },
      ],
      fretNum: '24',
      brand: 'Gretsch',
      model:
        'G5260 Electromatic Jet Baritone withV-Stoptail Guitar Dark Cherry Metallic',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: 'Maple, Thin “U”',
      bodyWood: 'Mahogany',
      scaleLen: '29.75” (756 mm)',
      fretboard: 'Laurel, 12” (305 mm)',
      frets: '22, Medium Jumbo',
      pickguard: 'Silver Plexi with Black Gretsch & Electromatic Logos',
      coilTap: false,
      coilSplit: false,
      bridge: 'Anchored Adjusto-Matic',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c114f',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/ibanez-rgib21-baritone-electric-guitar/p/IBA-RGIB21-LIST',
          price: '$799',
        },
      ],
      fretNum: '24',
      brand: 'Ibanez',
      model: 'RGIB21 Baritone Electric Guitar Black',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: 'Nitro Baritone 3-piece Maple/Purpleheart',
      bodyWood: 'Nyatoh',
      scaleLen: '712mm/28"',
      fretboard: 'Jatoba fretboard w/Off-set white dot inlay',
      frets: 'Jumbo',
      coilTap: false,
      coilSplit: false,
      bridge: 'Gibraltar Standard II bridge',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c1150',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/gretsch-g5260t-electromatic-jet-baritone-guitar-with-bigsby/p/GRE-2506001-LIST',
          price: '$699',
        },
      ],
      fretNum: '24',
      brand: 'Gretsch',
      model: 'G5260T Electromatic Jet Baritone with Bigsby Silver',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: 'Maple, Thin “U”',
      bodyWood: 'Mahogany',
      scaleLen: '29.75” (756 mm)',
      fretboard: 'Laurel, 12” (305 mm)',
      frets: '22, Medium Jumbo',
      pickguard: 'Silver Plexi with Black Gretsch & Electromatic Logos',
      coilTap: false,
      coilSplit: false,
      bridge: 'Anchored Adjusto-Matic',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c1151',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/esp-ltd-viper-400b-baritone-electric-guitar/p/ESP-VIPER400B-LIST',
          price: '$749',
        },
      ],
      fretNum: '24',
      brand: 'ESP LTD',
      model: 'Viper 400 Baritone Electric Guitar Satin Black',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: '3 Piece Mahogany',
      bodyWood: 'Mahogany',
      scaleLen: '27 inches',
      fretboard: 'Pau Ferro',
      neckConstruction: 'Set-Neck',
      frets: 'XJ',
      electronics: 'Active',
      fretboardRadius: '350mm',
      coilTap: false,
      coilSplit: false,
      bridge: 'TOM & Tailpiece',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c1152',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/ernie-ball-music-man-axis-baritone-bfr-electric-guitar/p/MUC-AXISBABFR-LIST',
          price: '$3,299',
        },
      ],
      fretNum: '24',
      brand: 'Ernie Ball Music Man',
      model: 'Axis Baritone BFR Electric Guitar with Case Starry Night',
      bodyConfig: 'Solid Body',
      inStock: false,
      scaleLen: '27-1/2" (69.85 cm)',
      frets: '24 - High profile, medium width',
      coilTap: false,
      coilSplit: false,
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c1153',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/esp-ltd-viper-201b-electric-baritone-guitar/p/ESP-VIPER201B-LIST',
          price: '$449',
        },
      ],
      fretNum: '24',
      brand: 'ESP LTD',
      model: 'Viper 201B Electric Baritone Guitar Black',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: '3pc maple',
      finish: 'black',
      color: 'black',
      bodyWood: 'mahogany',
      scaleLen: '27 inch baritone',
      fretboard: 'roasted jatoba',
      neckConstruction: 'set-neck',
      electronics: 'passive',
      coilTap: false,
      coilSplit: false,
      bridge: 'tom and tailpiece',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c1154',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/esp-ltd-h-1008-baritone-evertune-baritone-electric-guitar/p/ESP-H1008ET-LIST',
          price: '$1,399',
        },
      ],
      fretNum: '24',
      brand: 'ESP LTD',
      model: 'H-1008 Evertune Baritone Guitar Satin Black',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: '3Pc Maple',
      finish: 'Black Satin',
      color: 'Black Satin',
      bodyWood: 'Mahogany w/ Maple Cap',
      scaleLen: '27" Baritone',
      fretboard: 'Macassar Ebony',
      neckConstruction: 'Set-Thru',
      frets: 'XJ',
      fretboardRadius: '500mm',
      coilTap: false,
      coilSplit: false,
      bridge: 'Evertune (F model)',
    },
    {
      _id: {
        $oid: '605bd6a69e74b10ca01c1155',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/esp-ltd-m-7ht-arctic-metal-baritone-7-string-electric-guitar/p/ESP-M7BHT-LIST',
          price: '$999',
        },
      ],
      fretNum: '24',
      brand: 'ESP LTD',
      model: 'M-7HT Arctic Metal Baritone 7-String Electric Guitar',
      bodyConfig: 'Solid Body',
      inStock: false,
      neckWood: '3Pc Maple',
      finish: 'White Satin',
      color: 'White Satin',
      bodyWood: 'Alder',
      scaleLen: '27"',
      fretboard: 'Macassar Ebony',
      neckConstruction: 'Neck-Thru',
      frets: 'XJ,',
      electronics: 'Active',
      fretboardRadius: '400mm',
      coilTap: false,
      coilSplit: false,
      bridge: 'Hipshot w/ String Thru',
    },
    {
      _id: {
        $oid: '605bd6a99e74b10ca01c1156',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/ibanez-prestige-rg5328-8-string-electric-guitar-and-case/p/IBA-RG5328-LIST',
          price: '$1,899',
        },
      ],
      fretNum: '24',
      brand: 'Ibanez',
      model: 'Prestige RG5328 8 String Guitar w/ Case Lightning Through Dark',
      bodyConfig: 'Solid Body',
      stringCount: '8',
      inStock: false,
      neckWood: 'Wizard-8 5-piece Maple/Wenge Neck',
      bodyWood: 'Ash Body',
      scaleLen: '27" Scale',
      fretboard: 'Macassar Ebony with Mother of Pearl Dot Inlay',
      frets: 'Jumbo Stainless Steel ',
      pickupConfig: 'HH',
      coilTap: false,
      coilSplit: false,
      bridge: 'Gibraltar Standard II-8',
    },
    {
      _id: {
        $oid: '605bd6a99e74b10ca01c1157',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/schecter-c-8-multi-scale-electric-guitar-silver-mountain/p/SCE-C8MS-LIST',
          price: '$1,329',
        },
      ],
      fretNum: '24',
      brand: 'Schecter',
      model: 'C-8 Multi Scale Electric Guitar Silver Mountain',
      bodyConfig: 'Solid Body',
      stringCount: '8',
      inStock: false,
      neckWood: '3-piece mahogany set neck with ultra access',
      finish: 'Silver Mountain Distressed Metallic Silver',
      color: 'Silver Mountain Distressed Metallic Silver',
      bodyWood: 'Mahogany',
      fretboard: 'Ebony',
      inlays: 'Silver Polycarbonate fretboard inlay lines',
      frets: '24 Extra Jumbo Stainless steel',
      coilTap: false,
      coilSplit: false,
      bridge: 'Hipshot USA 8-String Multi-Scale fixed bridge',
    },
    {
      _id: {
        $oid: '605bd6a99e74b10ca01c1158',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/schecter-omen-8-8-string-electric-guitar/p/SCE-OMEN82012-LIST',
          price: '$499',
        },
      ],
      fretNum: '24',
      brand: 'Schecter',
      model: 'Omen 8 8 String Electric Guitar Black',
      bodyConfig: 'Solid Body',
      stringCount: '8',
      inStock: false,
      neckWood: 'Maple',
      bodyWood: 'Basswood',
      scaleLen: '26.5 inches',
      fretboard: 'Rosewood',
      neckConstruction: 'Bolt-On',
      frets: '24 X-Jumbo',
      electronics: 'Volume/Tone/3-way switch',
      coilTap: false,
      coilSplit: false,
      bridge: 'Schecter CTM8',
    },
    {
      _id: {
        $oid: '605bd6a99e74b10ca01c1159',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/esp-ltd-stephen-carpenter-sc-608b-baritone-8-string/p/ESP-SC608BX-LIST',
          price: '$1,349',
        },
      ],
      fretNum: '24',
      brand: 'ESP LTD',
      model: 'Stephen Carpenter SC608B Baritone with Case Red Sparkle',
      bodyConfig: 'Solid Body',
      stringCount: '8',
      inStock: false,
      neckWood: '3 Piece Maple',
      bodyWood: 'Mahogany',
      scaleLen: '27 inch Baritone',
      fretboard: 'Macassar Ebony',
      neckConstruction: 'Neck-Thru',
      frets: 'XJ',
      electronics: 'Active',
      fretboardRadius: '350mm',
      coilTap: false,
      coilSplit: false,
      bridge: 'Hipshot with String Thru',
    },
    {
      _id: {
        $oid: '605bd6a99e74b10ca01c115a',
      },
      image:
        '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',
      prices: [
        {
          website: 'American Musical Supply',
          url:
            'https://www.americanmusical.com/schecter-hellraiser-hybrid-c8-electric-guitar/p/SCE-HYBRIDC8-LIST',
          price: '$1,099',
        },
      ],
      fretNum: '24',
      brand: 'Schecter',
      model: 'Hellraiser Hybrid C8 Electric Guitar Trans Black Burst',
      bodyConfig: 'Solid Body',
      stringCount: '8',
      inStock: false,
      neckWood: 'Maple 3-pc w/ Carbon Fiber Reinforcement Rods',
      bodyWood: 'Mahogany',
      scaleLen: '28 inches (711mm)',
      fretboard: 'Ebony',
      inlays: 'MOP Offset/Reverse Dots w/Gothic Cross at 12th Fret',
      neckConstruction: 'Set-Neck w/Ultra Access',
      frets: '24 X-Jumbo',
      fretboardRadius: '20 inches (508mm)',
      coilTap: false,
      coilSplit: false,
      bridge: 'Hipshot Hardtail (.125) w/ String Thru Body',
    },
  ]

  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  const browser = await puppeteer.launch()
  // const browser = await puppeteer.launch({ headless: false, devtools: true }) //debug browser

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  )

  await page.setDefaultNavigationTimeout(0)
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))

  console.log('Updating electric guitar prices...')
  for (let i = 0; i < eGuitars.length; i++) {
    let eGuitar = { ...eGuitars[i] }
    delete eGuitar._id
    const eGuitarId = eGuitars[i]._id.$oid

    for (let j = 0; j < eGuitar.prices.length; j++) {
      let price
      if (eGuitar.prices[j].website === 'American Musical Supply') {
        price = await require(`../scrape`)[`priceAMS`](
          eGuitar.prices[j].url,
          page
        )
        console.log(price)
      }
      //   if (store.website === 'Sweetwater') {
      //     price = priceSweetwater(store.url, page)
      //   }
      //   if (store.website === 'Musicians Friend') {
      //     price = priceMF(store.url, page)
      //   }
      if (price) eGuitar.prices[j].price = price
    }
    await db
      .collection('electric-guitars')
      .updateOne({ _id: ObjectId(eGuitarId) }, { $set: eGuitar })
  }

  await browser.close()
}

main()

async function priceAMS(link, page) {
  await page.goto(link, { waitUntil: 'networkidle2' })
  const data = await page.evaluate(async () => {
    const body = document.getElementsByTagName('body')[0]
    await new Promise((resolve) => setTimeout(resolve, 5000))
    body.click()

    await page.evaluate(() => {
      debugger
    })

    let price = ''
    if (
      document.querySelector(
        '#specificationSwatchControl > div > div.specification-swatch-control--item-purchase > div.item-purchase--item-price-details > div > span.webprice.pricing'
      )
    ) {
      price = document
        .querySelector(
          '#specificationSwatchControl > div > div.specification-swatch-control--item-purchase > div.item-purchase--item-price-details > div > span.webprice.pricing'
        )
        .innerText.split('.')[0]
    }
    return { price: price }
  })
  return data
}
