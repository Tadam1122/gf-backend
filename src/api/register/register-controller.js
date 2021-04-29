import { connectClient } from '../../db/connect'
import argon2 from 'argon2'
import { createTransport } from 'nodemailer'
import jwt from 'jsonwebtoken'

//create user
export async function create(req, res) {
  //check for valid request
  const validation = validateIndex(req.body)
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message })
  }

  //create user object
  const user = {
    username: req.body.username.toLowerCase(),
    password: await argon2.hash(req.body.password),
    email: req.body.email.toLowerCase(),
    wishlists: [],
    verified: false,
  }

  //connect to database
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')

  //check username not already taken
  const userCheck = await db
    .collection('users')
    .findOne({ username: user.username })
  if (userCheck) {
    return res
      .status(409)
      .json({ message: `Username '${req.body.username}' already taken./` })
  }

  //check if email not already used
  const emailCheck = await db.collection('users').findOne({ email: user.email })
  if (emailCheck) {
    return res
      .status(409)
      .json({ message: `Email '${req.body.email}' already taken./` })
  }

  //add new user and get id
  const result = await db.collection('users').insertOne(user)
  client.close()

  // transporter to send user confirmation email
  const transporter = createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: true,
  })

  //asynchronous email sign in
  jwt.sign(
    {
      user: { _id: result.insertedId },
    },
    process.env.EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    (err, token) => {
      const url = `https://guitar-finder.net/api/confirm/${token}`

      transporter.sendMail({
        to: user.email,
        subject: 'Confirm Email',
        html: `Hi ${user.username} <br/> Please click <a href="${url}">here</a> to confirm your email for your new account.`,
      })
    }
  )
  return res.status(200).json(user)
}

function validateIndex(body) {
  let errors = ''
  if (!body.username || !body.username.trim()) {
    errors += 'Username required./ '
  }
  if (!body.password || !body.password.trim()) {
    errors += 'Password required./ '
  }
  if (!body.email || !body.email.trim()) {
    errors += 'Email required./ '
  }
  return {
    isValid: !errors || !errors.trim(),
    message: errors,
  }
}
