import { loadResource } from './load_modules.js'

async function loadListContent(listSource) {
    let resultContent = '</ul>';
    const values = await Promise.all(listSource.map(src => loadResource(src)));
    values.forEach(value => resultContent += `<li class="list-group-item">${value.result.properties.name}</li>`);
    resultContent += '</ul>';
    return resultContent;
}

export async function render(data) {
    const container = document.createElement('div');
    container.classList.add('container', 'py-5');
    container.innerHTML = `
        <h1>Episode ${data.result.properties.episode_id} <b>${data.result.properties.title}</b></h1>
        <a class="btn btn-secondary my-1" href="${window.location.origin}" role="button">Back to episodes</a>
        <p class="lead mb-1">${data.result.properties.opening_crawl}</p>
        <h2>Planets:</h2>
    `;
    const listsElement = await Promise.all([data.result.properties.planets, data.result.properties.species]
        .map(src => loadListContent(src)));
    container.innerHTML += listsElement[0];
    container.innerHTML += '<h2>Species:</h2>';
    container.innerHTML += listsElement[1];
    return container;
}