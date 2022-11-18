const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    //get all users
    getUsers(req, res) {
      User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err))
    }, 

    //get a user
     getSingleUser(req, res) {
       User.findOne({ _id: req.params.userId })
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err))
     }, 

     //create a user
     createUser(req, res) {
       User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
     }, 

     //delete a user
     deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => 
      !user
      ? res.status(404).json({message: 'No such user exists' })
      : Thought.deleteMany({ _id: { $in: thought.users }})
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
     }, 

     //update a user
     updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'There is no such user exists' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
     }, 

     //add a thought to user
     addThought(req, res) {
      console.log('You are adding a thought!');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId},
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true}
        )
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'There is no such user exists' })
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
      },

      //delete a users thought
      removeThought(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { thoughts: {thoughtId: req.params.thoughtId }}},
        { runValidators: true, new: true }
        )
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'There is no such user exists' })
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
      }

  };