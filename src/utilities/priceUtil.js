export function getLowestPrice(stores) {
  let nonEmpty = stores.filter((store) => store.price.length > 0)
  return `$${Math.min(
    ...nonEmpty.map((store) =>
      Number(store.price.replace(/,/g, '').split('$')[1])
    )
  )}`
}

export function getLowestNumber(stores) {
  let nonEmpty = stores.filter((store) => store.price.length > 0)
  return Math.min(
    ...nonEmpty.map((store) =>
      Number(store.price.replace(/,/g, '').split('$')[1])
    )
  )
}

export function priceToNumber(price) {
  return Number(price.split('$')[1])
}
