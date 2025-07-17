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
