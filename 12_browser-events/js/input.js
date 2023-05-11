(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.getElementsByClassName('form-control');
    const btn = document.getElementById('formBtn');
    const container = document.querySelector('.container');

    for (const input of inputs) {
      input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') return;
        const newValue = event.target.value + event.key;
        if (!/^[А-ЯЁ\-\s]+$/i.test(newValue)) {
          event.preventDefault();
        }
      });

      input.addEventListener('blur', () => {
        let correctValue = '';
        // убираем лишние символы
        for (let i = 0; i < input.value.length; i++) {
          if (input.value[i].match(/[А-ЯЁ\-\s]/i)) {
            correctValue += input.value[i];
          }
        }
        // убираем небуквенные символы в начале строки
        while ((correctValue.length > 0) && (!correctValue.charAt(0).match(/[А-ЯЁ]/i))) {
          correctValue = correctValue.substring(1);
        }

        // убираем небуквенные символы в конце строки
        while ((correctValue.length > 0) && (!correctValue.slice(-1).match(/[А-ЯЁ]/i))) {
          correctValue = correctValue.substring(0, correctValue.length - 1);
        }

        // объединяем несколько подряд идущих пробелов либо дефисов
        const currentValue = correctValue;
        correctValue = '';
        for (let i = 0; i < currentValue.length; i++) {
          if ((currentValue[i].match(/[\s-]/)) && (currentValue[i] === currentValue[i + 1])) {
            // eslint-disable-next-line no-continue
            continue;
          }
          correctValue += currentValue[i];
        }

        // приводим первую букву к верхнему регистру, остальные - к нижнему
        if (correctValue.length) {
          correctValue = correctValue.toLowerCase();
          correctValue = correctValue[0].toUpperCase() + correctValue.substring(1);
        }

        input.value = correctValue;
      });
    }

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      let newParagraph = '';
      for (const input of inputs) {
        newParagraph += ` ${input.value}`;
        input.value = '';
      }
      const par = document.createElement('p');
      par.classList.add('text-start');
      par.textContent = newParagraph.trim();
      container.append(par);
    });
  });
})();
