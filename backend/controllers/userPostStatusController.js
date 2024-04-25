const mongoose = require('mongoose');
const Post = require("../models/PostModel");
const UserPostStatus = require("../models/UserPostStatusModel")


const getAllStatuses = async (req,res) =>{
    try {

      const userPostStatuses = await UserPostStatus
          .find()
          .populate({
              path: 'userId',
              select: 'email _id username', // Specify the fields you want to include from the referenced document
          })
          .populate({
              path: 'postId',
              // Omitting the 'select' option will include all fields from the referenced document
          })
          .sort({ createdAt: -1 })
          .lean()
          .exec();

      res.status(200).json(userPostStatuses)

    } catch (err) {
      console.log(err);
    }
}
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

  const deleteStatus = async(req,res) => {
    try {
      const postId = req.body.postId
      const userId = req.user._id

      const userPostStatus = await UserPostStatus.findOneAndDelete({userId:userId, postId:postId});

      if(!userPostStatus){
        return res.status(404).json({error: "The saving of the post does not exist."})
      }
      console.log("status deleted")
      res.status(200).json({ deletedPost: userPostStatus });

    } catch (error) {
      console.log(error)
    }
  }

  const changeSavedToInWaitingStatus = async(req,res)=>{

    try {
      const statusId = req.body.statusId

      const userPostStatus = await UserPostStatus.findOneAndUpdate(
        {
            _id: statusId
        },
        {
          $set: {
            isSaved: false,
            isWaitingAdminResponse: true,
          },

        },
        {
          new:true,
        });


        res.status(200).json(userPostStatus)

    } catch (err) {
       console.log(err);
    }
  }

  const setUpWaitingStatus = async(req,res)=>{
    try {
      const postId = req.body.postId
      const userId = req.user._id

      const userPostStatus = await UserPostStatus.create({
        userId,
        postId,
        isSaved:false,
        isWaitingAdminResponse:true,
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

  const deleteAllStatusesOfPost = async (req, res) => {
    try {
        const postId = req.body.postId

        const userPostStatus = await UserPostStatus.deleteMany({ postId: postId });

        if (!userPostStatus || userPostStatus.deletedCount === 0) {
            return res.status(404).json({ error: "No statuses found for the post" });
        }

      
        res.status(200).json({ deletedCount: userPostStatus.deletedCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


  module.exports ={
    getAllStatuses,
    getStatusesOfUserId,
    savePost,
    deleteStatus,
    changeSavedToInWaitingStatus,
    setUpWaitingStatus,
    deleteAllStatusesOfPost,
  }