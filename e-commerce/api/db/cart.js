const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users'},
    productsId: { type: Schema.Types.ObjectId, ref: 'products'},
    quantity: Number
});
const Cart = mongoose.model("wishlists", cartSchema);
module.exports = Cart;