import regRoutes from './api/register/register-routes'
import authRoutes from './api/auth/auth-routes'
import eguitarRoutes from './api/eguitar/eguitar-routes'
import aguitarRoutes from './api/aguitar/aguitar-routes'
import aampRoutes from './api/aamp/aamp-routes'
import eampRoutes from './api/eamp/eamp-routes'
import pedalRoutes from './api/pedal/pedal-routes'
import userRoutes from './api/user/user-routes'
import wishlistRoutes from './api/wishlist/wishlist-routes'
import searchRoutes from './api/search/search-routes'

export function registerRoutes(app) {
  app.use('/api', authRoutes)
  app.use('/api', regRoutes)
  app.use('/api', eguitarRoutes)
  app.use('/api', aguitarRoutes)
  app.use('/api', aampRoutes)
  app.use('/api', eampRoutes)
  app.use('/api', pedalRoutes)
  app.use('/api', userRoutes)
  app.use('/api', wishlistRoutes)
  app.use('/api', searchRoutes)
}
