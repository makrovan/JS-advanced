(() => {
  const target = document.getElementById('app');
  const src = 'http://localhost:3000/api/products';
  const productCards = [];

  // функция создания карточек на основе полученных с сервера данных
  function renderProduct(product) {
    const productCard = document.createElement('div');
    const productCardBody = document.createElement('div');
    const productImg = document.createElement('img');
    const productTitle = document.createElement('h5');
    const prouctPrice = document.createElement('p');

    productCard.style.width = '18%';
    productCard.classList.add('card', 'my-2');
    productImg.classList.add('card-img-top');
    productTitle.classList.add('card-title');
    prouctPrice.classList.add('card-text');

    productCard.append(productImg);
    productCard.append(productCardBody);
    productCardBody.append(productTitle);
    productCardBody.append(prouctPrice);

    productImg.alt = product.name;
    productTitle.textContent = product.name;
    prouctPrice.textContent = product.price;
    productImg.src = product.image;
    productCards.push(productCard);
    return new Promise((resolve) => {
      productImg.addEventListener('load', () => {
        resolve();
      });
    });
  }

  // выводим окно уведомления в правом нижнем углу
  function showNotification(notification) {
    const notificationTarget = document.getElementById('notificationArea');
    const notificationWindow = document.createElement('div');
    notificationWindow.classList.add('toast');
    notificationWindow.style.opacity = '1';
    notificationWindow.innerHTML = `<div class="toast-header">
                                      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                                        <use xlink:href="#info-fill" />
                                      </svg>
                                      <strong class="ml-2 mr-auto">Внимание</strong>
                                    </div>
                                    <div class="toast-body">
                                      ${notification}
                                    </div>`;
    notificationTarget.append(notificationWindow);
    setTimeout(() => {
      notificationTarget.removeChild(notificationWindow);
    }, 3000);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center', 'py-4', 'flex-wrap');
    container.style.height = '100vh';
    target.append(container);

    // послкольку используем spinner из bootstarp, вынужден разместить его внутри container-а
    const spinner = document.createElement('div');
    const spinnerText = document.createElement('span');
    spinner.classList.add('spinner-border');
    spinner.style.cssText = 'width: 3rem; height: 3rem;';
    spinnerText.classList.add('sr-only');
    spinnerText.textContent = 'Загрузка...';
    spinner.append(spinnerText);
    container.append(spinner);

    let fetchData = null;
    const data = await fetch(src)
      .then(async (res) => {
        // Если сервер возвращает 500 статус ответа, повторите запрос два раза...
        if (res.status === 500) {
          fetchData = await fetch(src);
          if (fetchData.status !== 200) {
            fetchData = await fetch(src);
            if (fetchData.status !== 200) {
              throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
            }
          }
          // Если сервер возвращает пустой список товаров и 404 статус ответа ...
        } else if (res.status === 404) {
          return { products: [] };
          // Обработайте сетевую ошибку ...
        } else if (res.status !== 200) {
          throw new Error('Произошла ошибка, проверьте подключение к интернету');
        }
        fetchData = (!fetchData) ? res : fetchData;
        return fetchData.json();
      })
      .catch((err) => {
        // Обработайте ситуацию, когда сервер вернул невалидный JSON ...
        if ((err.name === 'SyntaxError') && (err.message === 'Unexpected end of JSON input')) {
          err.message = 'Произошла ошибка, попробуйте обновить страницу позже';
        }
        showNotification(err.message);
      })
      .finally(() => container.removeChild(spinner));

    // настраиваем container для отображения карточек с товаром
    container.classList.remove('justify-content-center', 'align-items-center');
    container.classList.add('justify-content-between');
    container.style.height = '';

    if (data) {
      const { products } = data;
      if (products.length) {
        // выводим надпись о загрузке картинок
        // чтобы не занимать container, поскольку туда сразу же будут грузиться карточки с товаром,
        // делаем центрирование без bootstrap
        const tempNotification = document.createElement('div');
        tempNotification.style.cssText = 'position: absolute; top: 50%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%);';
        tempNotification.textContent = 'Загружаю картинки';
        target.append(tempNotification);

        // пока все картинки не загрузятся, не отображаем
        Promise.all(products.map(async (product) => renderProduct(product)))
          .then(() => productCards.map((productCard) => container.append(productCard)))
          .then(() => target.removeChild(tempNotification));
      } else {
        const header = document.createElement('h1');
        header.textContent = 'Список товаров пуст';
        container.append(header);
      }
    }

    window.addEventListener('offline', () => {
      showNotification('Сетевое соединение пропало');
    });

    window.addEventListener('online', () => {
      showNotification('Сетевое соединение восстановлено');
    });
  });
})();
