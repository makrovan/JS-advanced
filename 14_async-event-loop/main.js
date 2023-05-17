import renderPage from './load_modules.js'

export async function mainPageRender() {
  const appContainer = document.getElementById('app');
  const searchParam = new URLSearchParams(location.search);
  const episodeId = searchParam.get('episodeId');

  if (episodeId) {
    const content = await renderPage(
      './film_details.js',
      `https://www.swapi.tech/api/films/${episodeId}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css'
    );
    appContainer.innerHTML = '';
    appContainer.append(content);
  } else {
    const content = await renderPage(
      './film_list.js',
      'https://www.swapi.tech/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css'
    );
    appContainer.innerHTML = '';
    appContainer.append(content);
  }

  const hrefElements = document.getElementsByTagName('a');
  for (const hrefElement of hrefElements) {
    hrefElement.addEventListener('click', (event) => {
      event.preventDefault();
      history.pushState(null, '', hrefElement.href);
      mainPageRender();
      appContainer.innerHTML = '<p>Идет загрузка</p>';
    });
  }

}

mainPageRender();
window.addEventListener('popstate', () => {
  // console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  mainPageRender();
  document.getElementById('app').innerHTML = '<p>Идет загрузка</p>';
});
