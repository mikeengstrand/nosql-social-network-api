const router = require('express').Router();

const {
  getThoughts,
  getOneThought,
  postThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

///api/thoughts
router.route('/').get(getThoughts).post(postThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);


//  /api/thoughts/:id/reactions/:reactionId
router.route('/:thoughtId/reaction/:reaction').post(addReaction).delete(deleteReaction)

module.exports = router;
