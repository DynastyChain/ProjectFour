'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PurchaseSchema = new mongoose.Schema({
  store: String,
  amount: Number,
  category: String,
  month: String,
  owner: String
});

export default mongoose.model('Purchase', PurchaseSchema);
