import express from 'express'
import path from 'path'
import cors from 'cors'
import http from 'http'
import { registerRoutes } from './routes'
import { scrapePrices } from './services/prod-services'

const app = express()
const port = process.env.PORT || 8000
const refreshTime = 60 * 10000 * 60 * 24

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(
  express.static(path.resolve(__dirname, '../dist'), {
    maxAge: '62d',
    etag: false,
  })
)

registerRoutes(app)

const httpServer = http.createServer(app)

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

httpServer.listen(port, () => {
  console.log(`app listening on port ${port}`)
  setInterval(scrapePrices, refreshTime)
  // setTimeout(scrapePrices, 5000)
})
