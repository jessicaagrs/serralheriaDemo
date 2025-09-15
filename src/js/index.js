document.addEventListener('DOMContentLoaded', () => {
  initCarousel('.services__cards');
  initMobileMenu();
  initObservers();
});

/* ======================
   Carrossel (drag to scroll)
   ====================== */
function initCarousel(selector) {
  const carousel = document.querySelector(selector);
  if (!carousel) return;

  let isPressed = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e) => {
    isPressed = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  };

  const stop = () => {
    isPressed = false;
    carousel.classList.remove('active');
  };

  const onMouseMove = (e) => {
    if (!isPressed) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // sensibilidade mantida
    carousel.scrollLeft = scrollLeft - walk;
  };

  carousel.addEventListener('mousedown', onMouseDown);
  carousel.addEventListener('mouseup', stop);
  carousel.addEventListener('mouseleave', stop);
  carousel.addEventListener('mousemove', onMouseMove);
  carousel.addEventListener('selectstart', (e) => e.preventDefault());
}

/* ======================
   Menu Mobile
   (preserva comportamento original)
   ====================== */
function initMobileMenu() {
  const iconMenu = document.getElementById('menu-icon');
  const closeButtonMenu = document.getElementById('button-close');
  const linksMenu = document.querySelectorAll('#links-mobile');
  const iconsMenu = document.querySelectorAll('#social-icons-mobile');
  const menuMobileContent = document.querySelector(
    '.header__links--mobile__content'
  );

  // se o menu não existir, apenas retorna (sem lançar erro)
  if (!menuMobileContent) {
    // mantém comportamento seguro — nada a fazer
    return;
  }

  const toggleMenu = () => menuMobileContent.classList.toggle('active');
  const closeMenu = () => menuMobileContent.classList.remove('active');

  iconMenu?.addEventListener('click', toggleMenu);
  closeButtonMenu?.addEventListener('click', closeMenu);

  linksMenu.forEach((link) => link.addEventListener('click', closeMenu));
  iconsMenu.forEach((el) => el.addEventListener('click', closeMenu));
}

/* ======================
   Observers / animações
   ====================== */
function initObservers() {
  const buttonBackToTop = document.querySelector('#arrow-up');
  const header = document.querySelector('#home');
  const textHome = document.querySelector('.home__text');
  const imageHome = document.querySelector('.home__image');
  const testimonials = document.querySelector('.testimonials__cards');
  const btnBudget = document.querySelector('#budget-button');

  if (buttonBackToTop && header) {
    observerElement(header, (isView) => {
      hideElement(isView, buttonBackToTop);
    });
  }

  if (textHome) {
    observerElement(textHome, (isView) => {
      fadeInLeft(isView, textHome);
    });
  }

  if (imageHome) {
    observerElement(imageHome, (isView) => {
      fadeInRight(isView, imageHome);
    });
  }

  if (testimonials) {
    observerElement(testimonials, (isView) => {
      slideInFwdCenter(isView, testimonials);
    });
  }

  if (btnBudget) {
    observerElement(btnBudget, (isView) => {
      vibrationEffect(isView, btnBudget);
    });
  }
}

/* ======================
   Funções de animação (assinaturas mantidas)
   ====================== */
function hideElement(isView, element) {
  element.style.display = isView ? 'none' : 'block';
}

function fadeInLeft(isView, element) {
  element.classList.toggle('fade-in-left', isView);
}

function fadeInRight(isView, element) {
  element.classList.toggle('fade-in-right', isView);
}

function slideInFwdCenter(isView, element) {
  element.classList.toggle('slide-in-fwd-center', isView);
}

function vibrationEffect(isView, element) {
  element.classList.toggle('vibrate-1', isView);
}

/* ======================
   Observer — preserva chamada (callback recebe isView, element)
   ====================== */
function observerElement(element, callback) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(true, element);
        } else {
          callback(false, element);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(element);
}
