import express from 'express'
import cors from 'cors'
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

registerRoutes(app)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
  setInterval(scrapePrices, refreshTime)
  // setTimeout(scrapePrices, 5000)
})
