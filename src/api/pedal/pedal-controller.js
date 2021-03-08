import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'

export async function index(_, res) {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //get all pedals
  const pedals = await db.collection('effect-pedals').find({}).toArray()
  client.close()
  return res.status(200).json(pedals)
}

export async function show(req, res) {
  const pedalId = req.params.id
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

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
