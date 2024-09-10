const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).array('images', 10);

app.use(express.static('public'));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'upload');
        } else {
            res.status(200).send('Images téléchargées');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
