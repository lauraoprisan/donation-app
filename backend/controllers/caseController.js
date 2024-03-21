const cloudinary = require("../middleware/cloudinary");
const mongoose = require('mongoose');
const Case = require("../modals/CaseModal");
const UserCaseStatus = require("../modals/UserCaseStatusModal")




const getCases = async (req, res) => {
    try {

      const cases = await Case.find({}).sort({createdAt: -1});
      res.status(200).json(cases)

    } catch (err) {
      console.log(err);
    }
}

const addCase = async (req, res) => {
  try {


    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);

    //media is stored on cloudinary - the above request responds with url to media and the media id that you will need when deleting content

    const casePost = await Case.create({
      title: req.body.title,
      location: req.body.location,
      needs: req.body.needs,
      personDescription: req.body.personDescription,
      // image: result.secure_url,
      // cloudinaryId: result.public_id,
      isOneTimeNeed: req.body.isOneTimeNeed,
      timeLimit: req.body.timeLimit,
      tag:req.body.tag || null
    });

    //i'll actually handle this when the user applies for a case
      // const userCaseStatus = await UserCaseStatus.create({
      //   caseId: casePost._id,
      //   test: "Test"
      // });

      res.status(200).json(casePost);
  } catch (err) {
      res.status(400).json({err:err.message})
  }
}
const deleteCase = async (req, res) => {
  try {

    const caseId = req.body.id

    if(!mongoose.Types.ObjectId.isValid(caseId)){
      return res.status(404).json({error: "Nu such case"})
    }

    const casePost = await Case.findOneAndDelete({ _id: caseId });

    if(!casePost){
      return res.status(404).json({error: "Nu such case"})
    } else{
      await cloudinary.uploader.destroy(casePost.cloudinaryId);
    }

    res.status(200).json(workout)
  } catch (err) {
      res.status(400).json({err:err.message})
  }
}


module.exports ={
  getCases,
  addCase,
  deleteCase
}