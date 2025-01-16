const footerText = document.querySelector('.footer-content p');
const currentYear = new Date().getFullYear();
footerText.innerHTML = `&copy; ${currentYear} LinkTree. Tous droits réservés.`;