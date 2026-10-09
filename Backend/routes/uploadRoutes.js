const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Base uploads root folder
const uploadBaseDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadBaseDir)) {
  fs.mkdirSync(uploadBaseDir, { recursive: true });
}

// Helper to determine clean folder name
const resolveFolder = (req) => {
  const reqFolder = (req.query.folder || req.body.folder || 'general').toString().toLowerCase().trim();
  const cleanFolder = reqFolder.replace(/[^a-z0-9_-]/g, '');
  return cleanFolder || 'general';
};

// Multer Storage Configuration with Dynamic Folder Creation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = resolveFolder(req);
    const targetDir = path.join(uploadBaseDir, folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  },
});

// File Filter for Images
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext) || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WEBP, SVG, GIF) are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max file size
  fileFilter: fileFilter,
});

// Single Image Upload Endpoint: POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const folder = path.basename(req.file.destination);
    const host = req.get('host');
    const protocol = req.protocol;
    const imageUrl = `${protocol}://${host}/uploads/${folder}/${req.file.filename}`;
    const relativePath = `/uploads/${folder}/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: `Image uploaded to ${folder} folder successfully`,
      folder: folder,
      filename: req.file.filename,
      imageUrl: imageUrl,
      relativePath: relativePath,
      size: req.file.size,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message,
    });
  }
});

// Alias Single Image Upload: POST /api/upload/image
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const folder = path.basename(req.file.destination);
    const host = req.get('host');
    const protocol = req.protocol;
    const imageUrl = `${protocol}://${host}/uploads/${folder}/${req.file.filename}`;
    const relativePath = `/uploads/${folder}/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: `Image uploaded to ${folder} folder successfully`,
      folder: folder,
      filename: req.file.filename,
      imageUrl: imageUrl,
      relativePath: relativePath,
      size: req.file.size,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message,
    });
  }
});

// Multiple Images Upload: POST /api/upload/multiple
router.post('/multiple', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files uploaded' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const uploadedFiles = req.files.map((file) => {
      const folder = path.basename(file.destination);
      return {
        folder: folder,
        filename: file.filename,
        imageUrl: `${protocol}://${host}/uploads/${folder}/${file.filename}`,
        relativePath: `/uploads/${folder}/${file.filename}`,
        size: file.size,
      };
    });

    return res.status(200).json({
      success: true,
      message: `${uploadedFiles.length} images uploaded successfully`,
      files: uploadedFiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload multiple images',
      error: error.message,
    });
  }
});

module.exports = router;
