import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'

export async function update(req, res) {
  const user = {
    wishlists: req.body.wishlists,
  }
  const userId = req.body.id

  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //update user
  await db
    .collection('users')
    .updateOne({ _id: ObjectId(userId) }, { $set: user })
  client.close()
  return res.status(200).json(user)
}
