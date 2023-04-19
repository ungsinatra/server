const { ConflictError } = require('../Errors/ConflictError');
const Resume = require('../models/resume');
const User = require('../models/user')
const {updateUser} = require('../services/userService');
module.exports.createResume = async (req, res) => {
  try {
    const newResume = req.body;
    const resumeExists = await Resume.findOne({ownerId: req.body.ownerId });
    if(!resumeExists){
      throw new ConflictError('У Пользовтеля уже зарегистрировано резюме');
    }
    const resume = await Resume.create(req.body);
    const createdUserRusume = await updateUser(newResume.ownerId,{resume:resume._id})
    console.log(createdUserRusume);
    res.status(201).json({ message: 'Резюме создан!', resume,createdUserRusume });
  } catch (error) {
    if(error instanceof ConflictError){
      res.status(error.statusCode).json({message:error.message});
    }else{
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate('ownerId');
    res.status(200).json(resumes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getResumeById = async (req, res) => {  
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    res.status(200).json(resume);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Резюме обнавлен!', resume });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findByIdAndDelete(id);
    res.status(200).json({ message: 'Резюме удален!', resume });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
