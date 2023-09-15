const { User, Thought } = require('../models');

module.exports = {

  // getThout - Retrieve all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought
        .find()
      res.json(thoughts);
    } catch (err) {res.status(500).json(err)}
  },


  // getOneThoughtr - Retrieve a single thout by their ID
  async getOneThought(req, res) {
    try {
      const thought = await Thought
        .findOne({ _id: req.params.thoughtId })
      if (!thought) {
        return res.status(404).json({message: 'No thought with that id'})
      }
      res.json(thought)
    } catch (err) {res.status(500).json(err)}
  },


  //postThought - create a new thought 
  async postThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { username: req.body.username},
        { $push: { thoughts: thought._id}}
      )
      res.json(thought)
    } catch (err) {res.status(500).json(err)}
  },


  //updateThought - update exising thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { new: true }
      )
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that id'});
      }
      res.json(thought)
    } catch (err) {res.status(500).json(err)}
  },


  // deleteThought - deleted thought 
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      if (!thought) {
        return res.status(404).json({message: 'No thought with that id'})
      }
      res.json({message: `Thought deleted`})
    } catch (err) {res.status(500).json(err)}
  },


  // addReaction - create reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $push: { reactions: req.body}}
      )
      if (!thought) {
        return res.status(404).json({message: 'No thought with that id'})
      }
      res.json(req.body)
  } catch (err) {res.status(500).json(err)}
  },


  // deleteReaction - reaction delted
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $pull: { reactions: { reactionId: req.params.reactionId}}}
      )
      if (!thought) {
        return res.status(404).json({message: 'No thought with that id'})
      }
      res.json({ message: 'Reaction deleted'})
  } catch (err) {res.status(500).json(err)}
  }


};



