// Animation de séparation avec transition finale fluide - Version corrigée
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const topDoor = document.querySelector('.container-profil');
    const bottomDoor = document.querySelector('.logo-container');
    const title = document.querySelector('.TitreSsTitre');
    const btnList = document.querySelector('.btnList');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    // Configurer le conteneur principal
    main.style.overflow = 'hidden';
    
    // Initialiser l'état initial - Version simplifiée
    function setupInitialState() {
        // Mettre le contenu principal en position relative
        main.style.position = 'relative';
        
        // S'assurer que les styles sont bien définis avant l'animation
        bottomDoor.style.position = 'fixed';
        bottomDoor.style.zIndex = '100';
        bottomDoor.style.opacity = '1';
        bottomDoor.style.width = '85%';
        bottomDoor.style.maxWidth = '500px';
        
        // Obtenir la position du conteneur supérieur
        const topRect = topDoor.getBoundingClientRect();
        
        // Positionner le logo-container juste sous le container-profil
        bottomDoor.style.top = topRect.bottom + 'px';
        bottomDoor.style.left = '50%';
        bottomDoor.style.transform = 'translateX(-50%)';
        bottomDoor.style.transition = 'none';
        
        // Forcer un reflow pour appliquer immédiatement
        void bottomDoor.offsetHeight;
        
        // Réactiver uniquement la transition sur la propriété top
        bottomDoor.style.transition = 'top 1.4s ease-out';
    }
    
    // Crée une transition douce vers la position finale
    function smoothFinalTransition() {
        // 1. Configurer la transition douce
        bottomDoor.style.transition = 'top 0.8s ease-in-out, opacity 0.3s ease';
        
        // 2. Animer vers la position CSS naturelle finale
        const btnListBottom = btnList.getBoundingClientRect().bottom + window.pageYOffset;
        const gap = 10; // Espace entre btnList et logo-container
        const finalTop = btnListBottom + gap;
        
        // Appliquer la position finale
        bottomDoor.style.top = finalTop + 'px';
        
        // 3. Une fois la transition terminée, supprimer les styles inline
        bottomDoor.addEventListener('transitionend', function finalTransitionHandler(e) {
            if (e.propertyName === 'top') {
                // Retirer l'écouteur d'événement
                bottomDoor.removeEventListener('transitionend', finalTransitionHandler);
                
                // Désactiver les transitions pour éviter les effets indésirables
                bottomDoor.style.transition = 'none';
                
                // Revenir au flux normal en changeant position de fixed à static
                bottomDoor.style.position = '';
                bottomDoor.style.transform = '';
                bottomDoor.style.top = '';
                bottomDoor.style.left = '';
                bottomDoor.style.width = '';
                bottomDoor.style.maxWidth = '';
                
                // Forcer un reflow
                void bottomDoor.offsetHeight;
                
                // Réactiver les transitions globales
                setTimeout(() => {
                    bottomDoor.style.transition = '';
                    bottomDoor.style.zIndex = '5';
                }, 50);
            }
        });
    }
    
    // Exécuter l'animation principale
    setTimeout(() => {
        setupInitialState();
        
        // Démarrer l'animation après un délai
        setTimeout(function() {
            // Animer vers une position intermédiaire pour révéler le contenu
            const intermediatePosition = (window.innerHeight * 0.65) - (bottomDoor.offsetHeight / 2);
            bottomDoor.style.top = intermediatePosition + 'px';
            
            // Faire apparaître le titre après le début du déplacement
            setTimeout(function() {
                title.style.opacity = '1';
                
                // Faire apparaître les boutons après le titre
                setTimeout(function() {
                    btnList.style.opacity = '1';
                    
                    // Transition finale douce
                    setTimeout(smoothFinalTransition, 400);
                }, 300);
            }, 500);
        }, 800);
    }, 100);
    
    // Ajouter l'année dans le footer
    const footerText = document.querySelector('.footer-content p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.textContent = `© ${currentYear} LinkTree. All Rights Reserved.`;
    }
});