import { connectClient } from '../../db/connect'
import argon2 from 'argon2'
import { generateJWT } from '../../services/auth-services'

export async function index(req, res) {
  //check for valid request
  const validation = validateIndex(req.body)
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message })
  }

  //connect to database
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')
  const user = await db
    .collection('users')
    .findOne({ username: req.body.username.toLowerCase() })

  //user not found
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Username or password did not match' })
  }

  const pwMatch = await argon2.verify(user.password, req.body.password)

  //password did not match
  if (!pwMatch) {
    return res
      .status(401)
      .json({ message: 'Username or password did not match' })
  }
  client.close()
  const token = generateJWT(user)
  return res.status(200).json({ token: token })
}

function validateIndex(body) {
  let errors = ''
  if (!body.username || !body.username.trim()) {
    errors += 'Username required. '
  }
  if (!body.password || !body.password.trim()) {
    errors += 'Password required. '
  }
  return {
    isValid: !errors || !errors.trim(),
    message: errors,
  }
}
