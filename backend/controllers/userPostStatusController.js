const mongoose = require('mongoose');
const Post = require("../models/PostModel");
const UserPostStatus = require("../models/UserPostStatusModel")

//get all the userPost statuses that have a specific userId
const getStatusesOfUserId = async(req,res) =>{
    try {
        const userId = req.user._id

        const userPostStatuses = await UserPostStatus.find({userId:userId}).populate('postId').sort({createdAt: -1}).lean().exec();

        res.status(200).json(userPostStatuses)

      } catch (err) {
        console.log(err);
      }
}

const savePost = async(req,res) => {
    try {
      const postId = req.body.postId
      const userId = req.user._id

      const userPostStatus = await UserPostStatus.create({
        userId,
        postId,
        isSaved:true,
        isWaitingAdminResponse:false,
        isReconfirmationRequired:false,
        isInAction:false,
        isCompleted:false,
        hasDroppedOut:false
      });

      res.status(200).json(userPostStatus)

    } catch (error) {
      console.error(err);
    }
  }

  const unsavePost = async(req,res) => {
    try {
      const postId = req.body.postId
      const userId = req.user._id

      const userPostStatus = await UserPostStatus.findOneAndDelete({userId:userId, postId:postId});

      if(!userPostStatus){
        return res.status(404).json({error: "The saving of the post does not exist."})
      }

      res.status(200).json({ deletedPost: userPostStatus });

    } catch (error) {
      console.log(error)
    }
  }

  module.exports ={
    getStatusesOfUserId,
    savePost,
    unsavePost,
  }