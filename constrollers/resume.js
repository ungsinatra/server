const Resume = require('../models/resume');

module.exports.createResume = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json({ message: 'Резюме создан!', resume });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
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
