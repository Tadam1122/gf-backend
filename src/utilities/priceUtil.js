//find lowest price from stores
export function getLowestPrice(stores) {
  let nonEmpty = stores.filter((store) => store.price.length > 0)
  return `$${Math.min(
    ...nonEmpty.map((store) =>
      Number(store.price.replace(/,/g, '').split('$')[1])
    )
  )}`
}

//find lowest number from stores of prices
export function getLowestNumber(stores) {
  let nonEmpty = stores.filter((store) => store.price.length > 0)
  return Math.min(
    ...nonEmpty.map((store) =>
      Number(store.price.replace(/,/g, '').split('$')[1])
    )
  )
}

//convert price to a number
export function priceToNumber(price) {
  return Number(price.split('$')[1])
}
