import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'

export async function index(_, res) {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log('fetching electric guitars')

  //get all electric guitars
  const eGutiars = await db.collection('electric-guitars').find({}).toArray()
  client.close()
  return res.status(200).json(eGutiars)
}

export async function show(req, res) {
  const eGuitarId = req.params.id
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log(`fetching electric guitar with id ${eGuitarId}`)

  //get electric guitar
  const eGutiar = await db
    .collection('electric-guitars')
    .findOne({ _id: ObjectId(eGuitarId) })
  client.close()

  //no electric guitar found
  if (!eGutiar) {
    return res
      .status(404)
      .json({ message: 'Electric guitar could not be found' })
  } else {
    return res.status(200).json(eGutiar)
  }
}

export async function update(req, res) {
  const eGuitar = req.body
  const eGuitarId = req.body.id

  console.log(`updating electric guitar with id ${eGuitarId}`)

  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //update electric guitar
  await db
    .collection('electric-guitars')
    .updateOne({ _id: ObjectId(eGuitarId) }, { $set: eGuitar })
  client.close()
  return res.status(200).json(eGuitar)
}
