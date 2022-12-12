const {Thoughts} = require('../models');
const thoughtsController = {
  getThoughts(req, res) {
    Thoughts.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log("There was an error. " + err);
        res.status(400).json(err)
      });
  }, 
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .select('-__v')
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'Thought not found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },  
  createThoughts({ body }, res) {
    Thoughts.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts with this ID. ' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'There is no Thoughts with this ID.' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },
  createReactions({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(500).json({ message: 'No thoughts found with this ID' });
          return;
        }
        res.json(dbThoughtsData)
      })
      .catch(err => res.json(err))
  },
  removeReaction({ params }, res) {
    Thoughts.findOne(
      { _id: params.thoughtId },

    )
      .then(dbThoughtsData => {
        dbThoughtsData.reactions.pull(params.reactionId)
        return dbThoughtsData.save();
      })

      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  }
}



module.exports = thoughtsController



