import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'
import argon2 from 'argon2'

export async function updateName(req, res) {
  const user = {
    username: req.body.username.toLowerCase(),
  }
  const userId = req.body.id

  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //check username not already taken
  const userCheck = await db
    .collection('users')
    .findOne({ username: user.username })
  if (userCheck) {
    return res
      .status(409)
      .json({ message: `Username '${req.body.username}' already taken` })
  }

  //update user
  await db
    .collection('users')
    .updateOne({ _id: ObjectId(userId) }, { $set: user })
  client.close()
  return res.status(200).json(user)
}

export async function updateEmail(req, res) {
  const user = {
    email: req.body.email.toLowerCase(),
  }
  const userId = req.body.id

  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //check if email not already used
  const emailCheck = await db.collection('users').findOne({ email: user.email })
  if (emailCheck) {
    return res
      .status(409)
      .json({ message: `Email '${req.body.email}' already taken` })
  }

  //update user
  await db
    .collection('users')
    .updateOne({ _id: ObjectId(userId) }, { $set: user })
  client.close()
  return res.status(200).json(user)
}

export async function updatePassword(req, res) {
  const user = {
    password: await argon2.hash(req.body.password),
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
