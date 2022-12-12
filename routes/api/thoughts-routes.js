const router = require('express').Router();
const {
  getThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReactions,
  removeReaction
} = require('../../controllers/thoughts-controller')
router 
.route('/')
.get(getThoughts)
.post(createThoughts)
router 
.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts);
router
.route('/:thoughtsId/reactions')
.post(createReactions)
router
.route('/:thoughtsId/reaction/reactionId')
.delete(removeReaction)
module.exports = router