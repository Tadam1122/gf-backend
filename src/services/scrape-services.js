// page evaluate function breaks when transpiled
async function priceAMS(link, page) {
  await page.goto(link, { waitUntil: 'networkidle2' })
  const data = await page.evaluate(async () => {
    const body = document.getElementsByTagName('body')[0]
    await new Promise((resolve) => setTimeout(resolve, 5000))
    body.click()

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
    return price
  })
  return data
}

// TODO: copy over this file anytime you update it since this file breaks when babel transpiles it

//TODO: find price element for sweetwater products
async function priceSweetwater(link, page) {
  await page.goto(link, { waitUntil: 'networkidle2' })
  const data = await page.evaluate(async () => {
    //click out of notification button by clicking on page
    const body = document.getElementsByTagName('body')[0]
    await new Promise((resolve) => setTimeout(resolve, 5000))
    body.click()

    //get price data
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
    return price
  })
  return data
}

//TODO: find price element for musicians friend products
async function priceMF(link, page) {
  await page.goto(link, { waitUntil: 'networkidle2' })
  const data = await page.evaluate(async () => {
    //click out of notification button by clicking on page
    const body = document.getElementsByTagName('body')[0]
    await new Promise((resolve) => setTimeout(resolve, 5000))
    body.click()

    //get price data
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
    return price
  })
  return data
}

exports.priceAMS = priceAMS
exports.priceSweetwater = priceSweetwater
exports.priceMF = priceMF
