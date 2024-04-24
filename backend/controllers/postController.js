const cloudinary = require("../middleware/cloudinary");
const mongoose = require('mongoose');
const Post = require("../models/PostModel");
const UserPostStatus = require("../models/UserPostStatusModel")


const getPosts = async (req, res) => {
    try {

      const posts = await Post.find({}).sort({createdAt: -1});
      res.status(200).json(posts)

    } catch (err) {
      console.log(err);
    }
}

const addPost = async (req, res) => {
  try {

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    //media is stored on cloudinary - the above request responds with url to media and the media id that you will need when deleting content

    const post = await Post.create({
      title: req.body.title,
      location: req.body.location,
      needs: req.body.needs,
      personDescription: req.body.personDescription,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      isOneTimeNeed: req.body.isOneTimeNeed,
      timeLimit: req.body.timeLimit,
      tag:req.body.tag || ''
    });

    //i'll actually handle this when the user applies for a case
      // const userCaseStatus = await UserCaseStatus.create({
      //   caseId: casePost._id,
      //   test: "Test"
      // });

      res.status(200).json(post);
  } catch (err) {
      res.status(400).json({err:err.message})
  }
}
const deletePost = async (req, res) => {
  try {

    const postId = req.body.postId

    if(!mongoose.Types.ObjectId.isValid(postId)){
      return res.status(404).json({error: "No such post"})
    }

    const post = await Post.findOneAndDelete({ _id: postId });

    if(!post){
      return res.status(404).json({error: "No such post"})
    } else{
       await cloudinary.uploader.destroy(post.cloudinaryId);
    }

    res.status(200).json(post)

  } catch (err) {
      res.status(400).json({err:err.message})
  }
}

const updatePost = async (req, res) => {
  try {
    const postId = req.body.id
    const post = await Post.findOneAndUpdate(
      {
          _id: postId
      },
      {
        $set: {
          title: req.body.title,
          location: req.body.location,
          needs: req.body.needs,
          personDescription: req.body.personDescription,
          isOneTimeNeed: req.body.isOneTimeNeed,
          timeLimit: req.body.timeLimit,
          tag:req.body.tag || null
        },

      },
      {
        new:true,
      });

      res.status(200).json(post)

  } catch (err) {
     console.log(err);
  }
}

const updateImage = async (req, res) => {
  try {
    const postId = req.body.postId
    const result = await cloudinary.uploader.upload(req.file.path);
    const post = await Post.findOneAndUpdate(
      {
          _id: postId
      },
      {
        $set: {
          image: result.secure_url,
          cloudinaryId: result.public_id,
        },

      },
      {
        new:true,
      });

      res.status(200).json(post)

  } catch (err) {
     console.log(err);
  }
}

module.exports ={
  getPosts,
  addPost,
  deletePost,
  updatePost,
  updateImage,
}