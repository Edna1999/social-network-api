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
      .then((user) => {
        !user
        ? res.status(400).json({message: 'No such user exists!'})
        : res.json({ message: 'User  deleted!' })
      })
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
     addFriend(req, res) {
    
      User.findOneAndUpdate(
        { _id: req.params.userId},
        { $addToSet: { friends: req.params.friendId } },
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
      removeFriend(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { friends: req.params.friendId }},
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