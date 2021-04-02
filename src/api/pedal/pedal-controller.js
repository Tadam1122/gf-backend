import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'

export async function index(_, res) {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log('fetching effect pedals')

  //get all pedals
  const pedals = await db.collection('effect-pedals').find({}).toArray()
  client.close()
  return res.status(200).json(pedals)
}

export async function show(req, res) {
  const pedalId = req.params.id
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log(`fetching effect pedal with id ${pedalId}`)

  //get pedal
  const pedal = await db
    .collection('effect-pedals')
    .findOne({ _id: ObjectId(pedalId) })
  client.close()

  //no pedal found
  if (!pedal) {
    return res.status(404).json({ message: 'Pedal could ont be found' })
  } else {
    return res.status(200).json(pedal)
  }
}

export async function update(req, res) {
  const pedal = req.body
  const pedalId = req.body.id

  console.log(`updating effect pedal with id ${pedalId}`)

  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //update pedals
  await db
    .collection('effect-pedals')
    .updateOne({ _id: ObjectId(pedalId) }, { $set: pedal })
  client.close()
  return res.status(200).json(pedal)
}
