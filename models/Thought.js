// date library used for timestamp
const moment = require('moment');

const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'A thought is required',
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
    },
    username: {
      type: String,
      required: true,
    },
    // from Reaction.js
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;