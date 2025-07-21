//@ts-check

const carrousel = document.querySelector('.services__cards');
let isPressed = false;
let startX;
let scrollLeft;

if (carrousel) {
  carrousel.addEventListener('mousedown', (e) => {
    isPressed = true;
    carrousel.classList.add('active');
    startX = e.pageX - carrousel.offsetLeft;
    scrollLeft = carrousel.scrollLeft;
  });

  carrousel.addEventListener('mouseleave', () => {
    isPressed = false;
    carrousel.classList.remove('active');
  });

  carrousel.addEventListener('mouseup', () => {
    isPressed = false;
    carrousel.classList.remove('active');
  });

  carrousel.addEventListener('mousemove', (e) => {
    if (!isPressed) return;
    e.preventDefault();
    const x = e.pageX - carrousel.offsetLeft;
    const walk = (x - startX) * 2;
    carrousel.scrollLeft = scrollLeft - walk;
  });

  carrousel.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });
}

document.addEventListener('DOMContentLoaded', () => {
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

  if (textHome && imageHome) {
    observerElement(textHome, (isView) => {
      fadeInLeft(isView, textHome);
    });

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
});

function hideElement(isView, element) {
  if (isView) {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
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
