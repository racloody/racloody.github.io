document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelectorAll('nav ul');
    const burgerText = burgerMenu.querySelector('h1');
    const homePhotoTrigger = document.getElementById('home-photo-trigger');
    const homePhotoPopupBg = document.getElementById('home-photo-popup-bg');
    const homePhotoPopup = document.getElementById('home-photo-popup');
    const homePhotoPopupClose = document.getElementById('home-photo-popup-close');
    const homeAboutContent = document.getElementById('home-about-content');
    const homeParcoursContent = document.getElementById('home-parcours-content');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active'); // Toggle active class on burger menu
        navLinks.forEach(nav => nav.classList.toggle('active')); // Show or hide navigation links
    });

    // Ensure the text always displays "Menu"
    burgerText.textContent = 'Menu';

    if (homePhotoTrigger && homePhotoPopupBg) {
        const openHomePhotoPopup = () => {
            homePhotoPopupBg.classList.add('active');
        };

        const closeHomePhotoPopup = () => {
            homePhotoPopupBg.classList.remove('active');
        };

        homePhotoTrigger.addEventListener('click', openHomePhotoPopup);

        if (homePhotoPopupClose) {
            homePhotoPopupClose.addEventListener('click', closeHomePhotoPopup);
        }

        homePhotoPopupBg.addEventListener('click', closeHomePhotoPopup);

        if (homePhotoPopup) {
            homePhotoPopup.addEventListener('click', (event) => event.stopPropagation());
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && homePhotoPopupBg.classList.contains('active')) {
                closeHomePhotoPopup();
            }
        });
    }

    const syncHomeTextHeights = () => {
        if (!homeAboutContent || !homeParcoursContent) {
            return;
        }

        homeAboutContent.style.minHeight = '';

        if (window.innerWidth <= 768) {
            return;
        }

        const parcoursHeight = homeParcoursContent.getBoundingClientRect().height;
        homeAboutContent.style.minHeight = `${Math.ceil(parcoursHeight)}px`;
    };

    syncHomeTextHeights();
    window.addEventListener('resize', syncHomeTextHeights);
    window.setTimeout(syncHomeTextHeights, 150);
});
