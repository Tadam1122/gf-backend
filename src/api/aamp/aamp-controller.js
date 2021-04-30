import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'

export async function index(_, res) {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log('fetching acoustic amplifiers')

  //get all acoustic amps
  const aAmps = await db.collection('acoustic-amps').find({}).toArray()
  client.close()
  return res.status(200).json(aAmps)
}

export async function show(req, res) {
  const aAmpId = req.params.id
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  console.log(`fetching acoustic amplifier with id ${aAmpId}`)

  //get acoustic amp
  const aAmp = await db
    .collection('acoustic-amps')
    .findOne({ _id: ObjectId(aAmpId) })
  client.close()

  //no acoustic amp found
  if (!aAmp) {
    return res.status(404).json({ message: 'Acoustic amp could ont be found' })
  } else {
    return res.status(200).json(aAmp)
  }
}
