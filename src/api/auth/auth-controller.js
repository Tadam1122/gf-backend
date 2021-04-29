import { connectClient } from '../../db/connect'
import { ObjectId } from 'mongodb'
import argon2 from 'argon2'
import { generateJWT } from '../../services/auth-services'
import jwt from 'jsonwebtoken'
import { createTransport } from 'nodemailer'

export async function verify(req, res) {
  try {
    const results = jwt.verify(req.params.token, process.env.EMAIL_SECRET)
    const client = await connectClient()
    const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')
    await db
      .collection('users')
      .findOneAndUpdate(
        { _id: ObjectId(results.user._id) },
        { $set: { verified: true } },
        { returnOriginal: false }
      )
    client.close()
  } catch {
    return res.send('Error validating user')
  }
  return res.redirect('https://guitar-finder.net/login')
}

export async function resend(req, res) {
  const client = await connectClient()
  const db = client.db(process.env.MONGO_DBNAME || 'guitar-finder')
  const results = await db
    .collection('users')
    .findOne({ email: req.body.email.toLowerCase() })
  client.close()

  if (results) {
    const transporter = createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    })

    jwt.sign(
      {
        user: { _id: results._id },
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        const url = `https://guitar-finder.net/api/confirm/${token}`

        transporter.sendMail({
          to: req.body.email,
          subject: 'Confirm Email',
          html: `Hi ${results.username} <br/> Please click <a href="${url}">here</a> to confirm your email for your new account.`,
        })
      }
    )
    return res.status(200).json(results)
  } else {
    return res
      .status(400)
      .json({ message: `No account found with email '${req.body.email}'.` })
  }
}

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

  if (!user.verified) {
    return res
      .status(403)
      .json({ message: 'Please verify account before logging in.' })
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
