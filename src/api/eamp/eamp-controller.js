import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'

export async function index(_, res) {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //get all electric amps
  const eAmps = await db.collection('electric-amps').find({}).toArray()
  client.close()
  return res.status(200).json(eAmps)
}

export async function show(req, res) {
  const eAmpId = req.params.id
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //get acoustic amp
  const eAmp = await db
    .collection('electric-amps')
    .findOne({ _id: ObjectId(eAmpId) })
  client.close()

  //no acoustic amp found
  if (!eAmp) {
    return res.status(404).json({ message: 'Electric amp could ont be found' })
  } else {
    return res.status(200).json(eAmp)
  }
}
