export function render(data) {
    const container = document.createElement('div');
    container.classList.add('container', 'py-5');
    const listGroup = document.createElement('div');
    listGroup.classList.add('list-group');

    for (const film of data.result) {
        const link = document.createElement('a');
        link.classList.add('list-group-item', 'list-group-item-action');
        link.href = `?episodeId=${film.uid}`;
        const title = document.createElement('h5');
        title.classList.add('mb-1');
        title.textContent = film.properties.title;
        link.append(title);
        const episodeNumber = document.createElement('small');
        episodeNumber.textContent = `Episode № ${film.uid}`;
        link.append(episodeNumber);
        listGroup.append(link);
    }

    container.append(listGroup);
    return container;
}