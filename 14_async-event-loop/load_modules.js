const cssPromises = {};

export async function loadResource(src) {
    //JavaScript module
    if (src.endsWith('.js')) {
        return import(src);
    }
    //CSS file
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromises[src] = new Promise((resolve) => {
                link.addEventListener('load', () => { resolve() });
            });
            document.head.append(link);
        }
        return cssPromises[src];
    }
    //remote server api
    return fetch(src).then(res => res.json());
    // const res = await fetch(src);
    // const str = await res.json();
    // return str;
}

export default async function renderPage(moduleName, apiUrl, css) {
    const [pageModule, data] = await Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)));
    return pageModule.render(data);
}
