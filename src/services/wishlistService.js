import { ObjectId } from 'bson'

export async function updateWishlists(db, priceDiff, productId) {
  const users = db.collection('users').find({})
  for (let user of users) {
    let updated = false
    for (let wishlist of user.wishlists) {
      for (let product of wishlist.items) {
        if (product.id === productId) {
          wishlist.totalPrice -= priceDiff
          updated = true
        }
      }
    }
    // update new totalprice for a user
    if (updated) {
      await db
        .collection('users')
        .updateOne({ _id: ObjectId(user._id) }, { $set: user })
    }
  }
}
