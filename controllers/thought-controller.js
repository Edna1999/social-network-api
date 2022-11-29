const { User, Thought} = require('../models');

module.exports = {

    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .sort({createAt: -1})
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    //get a thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) => 
         !thought
         ? res.status(400).json({message: 'Cant find thought with that id!'})
         : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate({_id:req.body.userId},{$push:{thoughts:thought._id}})
        })
        .then((user) => {
            if(!user){
                res.status(400).json({message: 'Cant find user with that id'})
            } else {
                res.json(user)
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    }, 

    //delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'Thought with that id doesnt exist!'})
        : res.json({ message: 'User deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },

    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
           !thought
           ? res.status(404).json({ message: 'There is no thought with this id!' })
           : res.json(thought)

        )
        .catch((err) => res.status(500).json(err));
    }
};