


const form = document.querySelector('#formulario');
const content = document.querySelector('#resultado');
const pagination = document.querySelector('#paginacion');
// var

let perPage, contPag = 12;

// funct


const api_pixabyRequest = async (termino,page = 1) => {

    const key = `31216228-2e571517436c07fcb46a9c218`;
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&page=${page}&per_page=${perPage}`;
    clearContent()
    const killloader = loader()
    try {
        const result = await ( await fetch(url)).json();
        killloader.remove()
        for( let i = 0; i < result['hits'].length ; i++)
        {
            const card = cardPixaby(result['hits'][i]);
            // cantidad de paginas
            perPage = porPage(result['totalHits'],contPag)

            // render pag 
            pagina(contPag)
            // add card al html
            content.appendChild(card);
        }
        console.log(result);
    } catch(err) {console.log(err)}
}
const clearContent = () => {
    while(content.firstChild)
    {
        content.firstChild.remove()
    }
}
const porPage = (max, cont) => {
    return max / cont;
}

const pagina = (cantidad) => {
    const genedaro = pagGenerador(cantidad)

    while(pagination.firstChild)
    {  
        pagination.firstChild.remove()
    }
    while(true)
    {
        const { done, value} = genedaro.next()
        if(done) return;

        const nodoPag = buttonPag(value);
        pagination.appendChild(nodoPag);
    }
}
// hrml render

const buttonPag = value => {
    const pag = document.createElement('div');
    pag.dataset.pag = value
    pag.innerText = value
    pag.classList.add('p-4','font-bold','text-white','cursor-pointer')

    pag.onclick = () => pagHandler(value);

    return pag
}
const cardPixaby = datos => {
    const { previewURL, tags, downloads, largeImageURL, likes, views } = datos;
    const card = document.createElement('div');
    card.classList.add('bg-white','p-3','rounded')

    card.innerHTML = 
    `
        <div class='rounded mb-4'>
            <img class='w-full' src='${previewURL}'/>
            <span class='text-sm'>${tags}</span>
        </div>
        <div class='flex flex-col font-light text-green-600 ' >
        <p>likes: <span class='font-bold'>${likes}</span></p>
        <p>views: <span class='font-bold'>${views}</span></p>
        <p>downloads: <span class='font-bold'>${downloads}</span></p>
        <a href='${largeImageURL}' target='_blank' rel='no-scoope' class='bg-yellow-500 rounded py-2 px-4 text-black font-bold cursor-pointer text-center'>pic full hd</a>
        </div>
    `

    return card;
}
const loader = () => {
    const load = document.createElement('div')
    load.classList.add('myloader')
    load.innerHTML = `<div class="lds-heart"><div></div></div>`
    content.appendChild(load)
    return load
}
document.addEventListener('DOMContentLoaded', initApp);

function initApp()
{
    form.addEventListener('submit', formHandler);
}

function formHandler(event)
{
    event.preventDefault();
    const search = this.querySelector('#termino').value;
    // valid
    if(search.value == '')
    {
        // pon una notificacion aqui
        return;
    }

    // peticion de la api aqui
    api_pixabyRequest(search)
}
function pagHandler(value)
{
    const search = document.querySelector('#termino').value;
    api_pixabyRequest(search,value)
    document.documentElement.scrollTop = 0;
}


function *pagGenerador(total)
{
    for (let index = 1; index <=total; index++) {
        yield index 
    }
}


