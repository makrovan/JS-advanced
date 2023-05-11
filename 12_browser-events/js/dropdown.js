(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.js-open-dropdown');
    const dropdownMenu = document.querySelector(openButton.dataset.target);

    openButton.addEventListener('click', (event) => {
      dropdownMenu.style.display = 'block';
      event.stopPropagation();
    });

    dropdownMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    window.addEventListener('click', () => {
      dropdownMenu.style.display = 'none';
    });
  });
})();
