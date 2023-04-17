const express = require('express');
const {
  createResume, getResumes, getResumeById, updateResume, deleteResume,
} = require('../constrollers/resume');

const router = express.Router();

router.post('/', createResume);
router.get('/me', getResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

module.exports = router;
