// share-treatment.js
// Simple carousel for testimonial items
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.testimonial-item');
  if (items.length === 0) return;
  let current = 0;
  const interval = 5000; // 5 seconds per slide
  function showItem(index) {
    items.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
  }
  showItem(current);
  setInterval(() => {
    current = (current + 1) % items.length;
    showItem(current);
  }, interval);
});
