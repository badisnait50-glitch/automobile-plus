// ==========================================
// CONFIGURATION EMAILJS
// ==========================================
const EMAILJS_PUBLIC_KEY = 'DPP8clqv5FZywDuaZ';
const EMAILJS_SERVICE_ID = 'service_v5sol9o';
const EMAILJS_TEMPLATE_ID = 'template_6f2j0v9';

// Initialiser EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);


// ==========================================
// GALERIE D'IMAGES - MINIATURES
// ==========================================
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function () {
        const galleryId = this.dataset.gallery;
        const fullImage = this.dataset.full;

        // Changer l'image principale
        const mainImage = document.querySelector(`.vehicle-image[data-gallery="${galleryId}"]`);
        mainImage.src = fullImage;

        // Mettre à jour la miniature active
        document.querySelectorAll(`.thumbnail[data-gallery="${galleryId}"]`).forEach(t => {
            t.classList.remove('active');
        });
        this.classList.add('active');
    });
});


// ==========================================
// SCROLL VERS LE FORMULAIRE DE CONTACT
// ==========================================
function scrollToContact(vehicleName) {
    const contactSection = document.getElementById('contactSection');
    const vehicleSelect = document.getElementById('vehicle');

    contactSection.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        if (vehicleName) {
            vehicleSelect.value = vehicleName;
        }
    }, 500);
}


// ==========================================
// ENVOI DU FORMULAIRE AVEC EMAILJS
// ==========================================
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Cacher les messages précédents
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    // Désactiver le bouton + afficher le loader
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';

    // Données du formulaire
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        vehicle: document.getElementById('vehicle').value || 'Non spécifié',
        message: document.getElementById('message').value
    };

    // Envoi via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            successMessage.classList.add('show');
            document.getElementById('contactForm').reset();
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, function (error) {
            console.log('FAILED...', error);
            errorMessage.classList.add('show');
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        })
        .finally(function () {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        });
});

