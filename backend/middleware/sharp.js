const sharp = require("sharp");
const fs = require("fs");

// Optimise les images
const optimizedImage = async (req, res, next) => {
    try {
      await sharp(req.file.path)
        .resize({width: 350, height: 500})
        .webp({quality: 80})
        .toFile(`${req.file.path}.webp`)
      fs.unlink(req.file.path, (error) => {
        req.file.path = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        if (error) {
          (() => res.status(500).json({ error: 'Impossible de supprimer le fichier'}))
        }
      })
    next();
    }
    catch (error){
      error => res.status(500).json({ error })
    }
};

module.exports = optimizedImage;