const { User, Thought } = require('../models');

module.exports = {

  // getUsers - Retrieve all users
  async getUsers(req, res) {
    try {
      const users = await User
        .find()
        .populate('friends')
      res.json(users);
    } catch (err) {res.status(500).json(err)}
  },

  
  // getOneUser - Retrieve a single user by their ID, populating thoughts and friends
  async getOneUser(req, res) {
    try {
      const user = await User
        .findOne({ _id: req.params.userId })
        .populate('friends')
      if (!user) {
        return res.status(404).json({message: 'No user with that id'})
      }
      res.json(user)
    } catch (err) {res.status(500).json(err)}
  },


  // postUser - create a new user witth data from the request body
        // should look like: {
      //   "username": "lernantino",
      //   "email": "lernantino@gmail.com"
      // }
      async postUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user)
        } catch (err) {res.status(500).json(err)}
      },


  // updateUser - update existing user by id with info from req.body
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $set: req.body },
        { new: true }
      )
      if (!user) {
        return res.status(404).json({ message: 'No user with that id'});
      }
      res.json(user)
    } catch (err) {res.status(500).json(err)}
  },


  // deleteUser - delete user and thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOne()
      if (!user) {
        return res.status(404).json({message: 'No user with that id'})
      }
      const thoughtsArr = user.thoughts.map(thought => thought.toString())
      thoughtsArr.forEach(async function (thoughtId) { 
        await Thought.findOneAndDelete({ _id: thoughtId}) 
      })
      await User.findOneAndDelete({ _id: user.userId});
      res.json({message: `User has been deleted`})
    } catch (err) {res.status(500).json(err)}
  },


  // addFriend - add friend using their id
  async addFriend(req, res) {
    try {
      const newFriend = await User.findOne({ _id: req.params.friendId })
      if (!newFriend) {
        return res.status(404).json({ message: 'No user with that id' })
      }
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $push: { friends: req.params.friendId}});
      if (!user) {
        return res.status(404).json({ message: 'No user with that id' })
      }
      res.json({ message: `friendd added`})
    } catch (err) {res.status(500).json(err)}
  },


  // deleteFriend - remove friennd by id
  async deleteFriend(req, res) {
    try {
      const oldFriend = await User.findOne({ _id: req.params.friendId })
      if (!oldFriend) {
        return res.status(404).json({ message: 'No user with that id' })
      }
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { friends: req.params.friendId}});
      if (!user) {
        return res.status(404).json({ message: 'No user with that id' })
      }
      res.json({ message: `friend deletedd`})
    } catch (err) {res.status(500).json(err)}
  }


};