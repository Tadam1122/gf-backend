import express from 'express'
import cors from 'cors'
import { registerRoutes } from './routes'

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

registerRoutes(app)

// app.get('/', (req, res) => {
//   console.log('client connected')
//   res.send({ message: 'hello from server!' })
// })

app.listen(port, () => {
  console.log('app listening on port 8000')
})
