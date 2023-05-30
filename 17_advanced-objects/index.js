(() => {
  const form = document.getElementById('startForm');
  const inputElement = document.getElementById('inputElement');
  const resultContainer = document.getElementById('resultContainer');

  function renderClassName(className) {
    if (typeof className === 'function') {
      let proto = className.prototype;
      const protoList = document.createElement('ol');
      while (proto) {
        const protoElement = document.createElement('li');
        if (proto.constructor) {
          protoElement.textContent = proto.constructor.name;
        } else {
          protoElement.textContent = '';
        }
        protoList.append(protoElement);
        const enumeratedProperties = Object.keys(proto);
        if (enumeratedProperties.length) {
          const propList = document.createElement('ol');
          enumeratedProperties.forEach((enumProp) => {
            const propElement = document.createElement('li');
            propElement.textContent = `${enumProp}  :  ${typeof globalThis[String(enumProp)]}`;
            propList.append(propElement);
          });
          protoElement.append(propList);
        }
        proto = Object.getPrototypeOf(proto);
      }
      return protoList;
    } else {
      return null;
    }
  }

  function inputError(isError = true) {
    if (isError) {
      inputElement.style.textDecoration = 'underline';
      inputElement.style.textDecorationColor = 'red';
    } else {
      inputElement.style.textDecoration = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {

    form.addEventListener('submit', async (e) => {

      e.preventDefault();
      let inputValue = inputElement.value;
      resultContainer.innerHTML = '';
      let prototypeList = null;

      if (inputValue.endsWith('.js')) {
        // const module = await import(inputValue);
        await import(inputValue)
          .then((module) => {
            prototypeList = renderClassName(module.default);
          })
          .catch((err) => {
            console.log(err);
            // inputError();
          });
      } else {
        prototypeList = renderClassName(window[inputValue]);
      }

      if (prototypeList) {
        resultContainer.append(prototypeList);
      } else {
        inputError();
      }
    });

    form.addEventListener('input', () => {
      inputError(false);
    });

  });

})();
