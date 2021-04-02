import { connectClient } from '../../db/connect'

//search for products given a query
export async function show(req, res) {
  const query = req.params.query
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log(`searching products with query '${query}'`)

  let products = []

  //search electric guitars
  const eGuitars = await db
    .collection('electric-guitars')
    .find({ $text: { $search: query } })
    .toArray()
  if (eGuitars) products = products.concat(eGuitars)

  //search acoustic guitars
  const aGuitars = await db
    .collection('acoustic-guitars')
    .find({ $text: { $search: query } })
    .toArray()
  if (aGuitars) products = products.concat(aGuitars)

  //search electric amps
  const eAmps = await db
    .collection('electric-amps')
    .find({ $text: { $search: query } })
    .toArray()
  if (eAmps) products = products.concat(eAmps)

  //search acoustic amps
  const aAmps = await db
    .collection('acoustic-amps')
    .find({ $text: { $search: query } })
    .toArray()
  if (aAmps) products = products.concat(aAmps)

  //search effect pedals
  const pedals = await db
    .collection('effect-pedals')
    .find({ $text: { $search: query } })
    .toArray()
  if (pedals) products = products.concat(pedals)

  return res.status(200).json(products)
}
