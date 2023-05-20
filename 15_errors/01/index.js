export function calculateDiscount(price, percent) {
  if ((typeof price !== 'number' || Number.isNaN(price)) || ((typeof percent !== 'number' || Number.isNaN(percent)))) {
    throw new TypeError('Аргумент - не число');
  }
  return (price / 100) * percent;
}

export function getMarketingPrice(product) {
  try {
    const productObject = JSON.parse(product);
    return productObject.prices.marketingPrice;
  } catch (error) {
    if (error.name === 'TypeError') {
      console.log(error.message);
      return null;
    }
    throw error;
  }
}

// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
    reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  try {
    const image = await fetchAvatarImage(userId);
    return image.url;
  } catch {
    return '/images/default.jpg';
  }
}
