const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res)=>{
  if(!req.file) return res.status(400).json({ message:'no file' });
  // placeholder: return stub prediction
  res.json({ message:'Received', file: req.file.filename, predicted: { plant: 'Unknown (placeholder)', confidence: 0.0 } });
});

module.exports = router;
