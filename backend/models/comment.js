const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

mongoose.model('Comment', CommentSchema);
module.exports = mongoose.model("Comment", CommentSchema);
