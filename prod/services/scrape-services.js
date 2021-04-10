// page evaluate function breaks when transpiled
// copy file to prod instead of letting babel transpile these functions

// find both price and in stock element for AMS products
async function priceAMS(link, page) {
  await page.goto(link, { waitUntil: 'networkidle2' })
  const data = await page.evaluate(async () => {
    const body = document.getElementsByTagName('body')[0]
    await new Promise((resolve) => setTimeout(resolve, 1000))
    body.click()

    let price = ''
    let inStock = false
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
    if (
      document.querySelector(
        '#specificationSwatchControl > div > div.specification-swatch-control--item-purchase > div.item-purchase--item-availability-message.ng-binding > label.iteminstock > span > strong'
      )
    ) {
      if (
        document
          .querySelector(
            '#specificationSwatchControl > div > div.specification-swatch-control--item-purchase > div.item-purchase--item-availability-message.ng-binding > label.iteminstock > span > strong'
          )
          .innerText.includes('In Stock')
      ) {
        inStock = true
      }
    }
    return { price, inStock }
  })
  return data
}

// find both price and in stock element for sweetwater products
async function priceSweetwater(link, page) {
  await page.goto(link, { waitUntil: 'networkidle2' })
  const data = await page.evaluate(async () => {
    //click out of notification button by clicking on page
    const body = document.getElementsByTagName('body')[0]
    await new Promise((resolve) => setTimeout(resolve, 1000))
    body.click()

    //get price data
    let price = ''
    let inStock = false
    document.querySelector(
      '#product-options > div:nth-child(1) > div > div.product-price--final > price > dollars'
    )
    if (
      document.querySelector(
        '#product-options > div:nth-child(1) > div > div.product-price--final > price > dollars'
      )
    ) {
      price = `$${
        document.querySelector(
          '#product-options > div:nth-child(1) > div > div.product-price--final > price > dollars'
        ).innerText
      }`
    }
    //check for in stock element
    if (
      document.querySelector('#product-options > div.product-avail > strong')
    ) {
      if (
        document.querySelector('#product-options > div.product-avail > strong')
          .innerText === 'In Stock!'
      ) {
        inStock = true
      }
    }
    return { price, inStock }
  })
  return data
}

// find both price and in stock element for mf products
async function priceMF(link, page) {
  await page.goto(link, { waitUntil: 'networkidle2' })
  const data = await page.evaluate(async () => {
    //click out of notification button by clicking on page
    const body = document.getElementsByTagName('body')[0]
    await new Promise((resolve) => setTimeout(resolve, 1000))
    body.click()

    //get price data
    let price = ''
    let inStock = false
    if (
      document.querySelector(
        '#mainContent > main > div.pdp-desktop-section > div.pdp-details-wrapper > div.pdp-section.pdp-section-buy.-inner-card > div.price-display > span > span:nth-child(1)'
      )
    ) {
      price = document
        .querySelector(
          '#mainContent > main > div.pdp-desktop-section > div.pdp-details-wrapper > div.pdp-section.pdp-section-buy.-inner-card > div.price-display > span > span:nth-child(1)'
        )
        .innerText.split('.')[0]
    }
    if (
      document.querySelector(
        '#mainContent > main > div.pdp-desktop-section > div.pdp-details-wrapper > div.pdp-section.pdp-section-buy.-inner-card > div.inventory-messaging > span'
      )
    ) {
      if (
        document
          .querySelector(
            '#mainContent > main > div.pdp-desktop-section > div.pdp-details-wrapper > div.pdp-section.pdp-section-buy.-inner-card > div.inventory-messaging > span'
          )
          .innerText.includes('In Stock')
      ) {
        inStock = true
      }
    }
    return { price, inStock }
  })
  return data
}

exports.priceAMS = priceAMS
exports.priceSweetwater = priceSweetwater
exports.priceMF = priceMF
