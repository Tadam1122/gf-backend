async function priceAMS(link, page) {
  console.log(link)
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

exports.priceAMS = priceAMS
