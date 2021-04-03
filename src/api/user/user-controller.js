import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'
import argon2 from 'argon2'
import { generateJWT } from '../../services/auth-services'

export async function update(req, res) {
  let user = { ...req.body }
  delete user.id
  const userId = req.body.id

  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //check username not already taken
  if (user.username) {
    const userCheck = await db
      .collection('users')
      .findOne({ username: user.username })
    if (userCheck) {
      return res
        .status(409)
        .json({ message: `Username '${req.body.username}' already taken` })
    }
  }
  //check email not already taken
  if (user.email) {
    const emailCheck = await db
      .collection('users')
      .findOne({ email: user.email })
    if (emailCheck) {
      return res
        .status(409)
        .json({ message: `Email '${req.body.email}' already taken` })
    }
  }

  //hash new password
  if (user.password) {
    user.password = await argon2.hash(user.password)
  }

  console.log(`updating user with id ${userId}`)

  //update user
  const newUser = await db
    .collection('users')
    .findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: user },
      { returnOriginal: false }
    )

  client.close()
  const token = generateJWT(newUser.value)
  return res.status(200).json({ token: token })
}
