// Variable pour suivre le mode actuel (batiment, rdc, ou etage)
let currentMode = 'batiment';

// Variable pour suivre l'index actuel (de 0 à 6)
let currentIndex = 0;

// Sélectionne l'élément du curseur (slider) dans le document HTML
const slider = document.getElementById('slider');

// Objet contenant les références des divs correspondant à chaque mode
const imageSets = {
    'batiment': document.getElementById('batiment'),
    'rdc': document.getElementById('rdc'),
    'etage': document.getElementById('etage')
};

// Objet contenant les références des boutons correspondant à chaque mode
const modeButtons = {
    'batiment': document.getElementById('btnBatiment'),
    'rdc': document.getElementById('btnRDC'),
    'etage': document.getElementById('btnEtage')
};

// Ajoute un écouteur d'événement sur le slider (curseur)
slider.addEventListener('input', () => {
    currentIndex = slider.value - 1;
    updateImage(currentIndex);
});

// Ajoute un écouteur d'événement pour la roulette de la souris
window.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        // Défilement vers le bas, passe à l'image suivante
        currentIndex = (currentIndex + 1) % 7; // Il y a 7 images, donc modulo 7
    } else {
        // Défilement vers le haut, passe à l'image précédente
        currentIndex = (currentIndex - 1 + 7) % 7; // Pour éviter un index négatif
    }
    // Met à jour la position du slider et l'image affichée
    slider.value = currentIndex + 1;
    updateImage(currentIndex);
});


// Fonction pour changer de mode (batiment, rdc, etage)
function switchMode(mode) {
    currentMode = mode;

    // Retire la classe 'active' des images et des boutons du mode précédent
    document.querySelector('.image-set.active').classList.remove('active');
    document.querySelector('button.active').classList.remove('active');

    // Ajoute la classe 'active' aux images et boutons du nouveau mode
    imageSets[mode].classList.add('active');
    modeButtons[mode].classList.add('active');

    // Met à jour l'image affichée
    updateImage(currentIndex);
}

// Fonction pour mettre à jour l'image affichée en fonction de l'index
function updateImage(index) {
    const activeImages = imageSets[currentMode].getElementsByTagName('img');
    for (let i = 0; i < activeImages.length; i++) {
        activeImages[i].style.display = i === index ? 'block' : 'none';
    }
}

// Initialisation : affiche la première image du mode par défaut (batiment)
updateImage(0);
modeButtons[currentMode].classList.add('active');


// Contenu des appartements
const appartements = {
    rdc: [
        { id: 1, name: 'Appartement 1', description: 'T3 82 m² avec garage', available: true },
        { id: 2, name: 'Appartement 2', description: 'T3 78 m² en rez de jardin', available: true },
        { id: 3, name: 'Appartement 3', description: 'T3 92 m² avec terrasse', available: false },
        { id: 4, name: 'Appartement 4', description: 'T2 54m²', available: false }
    ],
    etage: [
        { id: 1, name: 'Appartement 1', description: 'T3 82 m² avec garagee', available: false },
        { id: 2, name: 'Appartement 2', description: 'T3 78 m² en rez de jardin', available: false },
        { id: 3, name: 'Appartement 3', description: 'T3 92 m² avec terrasse', available: true },
        { id: 4, name: 'Appartement 4', description: 'T2 54m²', available: true }
    ],
    batiment: [
        { id: 1, name: 'Appartement 1', description: 'T3 85 m² avec terrasse', available: false },
        { id: 2, name: 'Appartement 2', description: 'T3 85 m² avec terrasse', available: false },
        { id: 3, name: 'Appartement 3', description: 'T3 85 m² avec terrasse', available: false },
        { id: 4, name: 'Appartement 4', description: 'T3 85 m² avec terrasse', available: false }
    ]
};

// Fonction pour mettre à jour la liste des appartements
function updateAppartements(mode) {
    const appartementList = document.getElementById('appartement-list');
    appartementList.innerHTML = ''; // Effacer le contenu précédent

    // Vérifie si on est en mode bâtiment
    if (mode === 'batiment') {
        appartementList.innerHTML = '<h5 style="text-align:center">Sélectionner un étage pour voir les appartements disponibles</h5>';
        return;
    }

    // Crée la liste des appartements en fonction du mode
    appartements[mode].forEach(appartement => {
        const appartementDiv = document.createElement('div');
        appartementDiv.className = 'appartement' + (appartement.available ? '' : ' disabled');

        appartementDiv.innerHTML = `
            <h3>${appartement.name}</h3>
            <p>${appartement.description}</p>
            <button ${!appartement.available ? 'disabled' : ''}>Visiter</button>
        `;

        appartementList.appendChild(appartementDiv);
    });
}

// Appelle la fonction quand on change de mode
function switchMode(mode) {
    currentMode = mode;

    // Retire la classe 'active' des images et des boutons du mode précédent
    document.querySelector('.image-set.active').classList.remove('active');
    document.querySelector('button.active').classList.remove('active');

    // Ajoute la classe 'active' aux images et boutons du nouveau mode
    imageSets[mode].classList.add('active');
    modeButtons[mode].classList.add('active');

    // Met à jour l'image affichée
    updateImage(currentIndex);

    // Met à jour la liste des appartements
    updateAppartements(mode);
}

// Initialisation : affiche la première image du mode par défaut (batiment) et la liste
updateImage(0);
modeButtons[currentMode].classList.add('active');
updateAppartements('batiment');



// Variable pour la modale
const modal = document.getElementById('modal');
const virtualTour = document.getElementById('virtualTour');
const closeBtn = document.getElementsByClassName('close')[0];

// Fonction pour afficher la modale
function openModal(url) {
    virtualTour.src = url;
    modal.style.display = 'block';
}

// Fonction pour fermer la modale
closeBtn.onclick = function() {
    modal.style.display = 'none';
    virtualTour.src = ''; // Optionnel : vide le contenu de l'iframe
}

// Cliquez en dehors de la modale pour la fermer
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        virtualTour.src = ''; // Optionnel : vide le contenu de l'iframe
    }
}

// Fonction pour gérer le clic sur le bouton "Visiter"
document.addEventListener('click', function(event) {
    if (event.target && event.target.tagName === 'BUTTON' && event.target.textContent === 'Visiter') {
        // Remplacez le lien de l'appartement avec le lien réel
        openModal('https://app.lapentor.com/sphere/maquette-1725963860');
    }
});
