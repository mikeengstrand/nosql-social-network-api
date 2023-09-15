const router = require('express').Router();

const {
  getUsers,
  getOneUser,
  postUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(postUser);

//  /api/users/:userId
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);


//  /api/users/:userId/friends/:friendId  (takes the user id and either adds/deletes the other user id as friend)
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;


