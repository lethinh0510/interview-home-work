const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  tags:[{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

PostSchema.plugin(mongoosePaginate);
PostSchema.index({title: 'text', content: 'text'});
module.exports = mongoose.model("Post", PostSchema);
