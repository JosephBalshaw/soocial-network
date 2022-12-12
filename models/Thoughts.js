const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: 'Username is Required.'
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  })
const ThoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought is required',
    validate: [({ length }) => length < 280, 'Thought should be less than 280 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: 'Username is required',
  },
  reactions: [ReactionSchema],
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  },
);
ThoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
const Thoughts = model('Thoughts', ThoughtsSchema);
module.exports = Thoughts;