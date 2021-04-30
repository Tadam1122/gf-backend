import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'

export async function index(_, res) {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log('fetching acoustic guitars')

  //get all acoustic guitars
  const aGutiars = await db.collection('acoustic-guitars').find({}).toArray()
  client.close()
  return res.status(200).json(aGutiars)
}

export async function show(req, res) {
  const aGuitarId = req.params.id
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log(`fetching acoustic guitar with id ${aGuitarId}`)

  //get acoustic guitar
  const aGutiar = await db
    .collection('acoustic-guitars')
    .findOne({ _id: ObjectId(aGuitarId) })
  client.close()

  //no acoustic guitar found
  if (!aGutiar) {
    return res
      .status(404)
      .json({ message: 'Acoustic guitar could ont be found' })
  } else {
    return res.status(200).json(aGutiar)
  }
}
