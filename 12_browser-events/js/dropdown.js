(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.js-open-dropdown');
    const dropdownMenu = document.querySelector(openButton.dataset.target);

    openButton.addEventListener('click', (event) => {
      dropdownMenu.style.display = 'block';
      event.isClickedWithinDropdown = true;
    });

    dropdownMenu.addEventListener('click', (event) => {
      event.isClickedWithinDropdown = true;
    });

    window.addEventListener('click', (event) => {
      if (event.isClickedWithinDropdown) return;
      dropdownMenu.style.display = 'none';
    });
  });
})();
