// buttons
const btnShorten = document.querySelector(".btn-shorten");

// component link 
const urlsComponent = document.querySelector(".urls");

let cont = 0;


const getLinkShort = async(link) => {
    try {
        const linkAPI = `https://api.shrtco.de/v2/shorten?url=${link}`;
        let url = await fetch(linkAPI);
        url = await url.json();
        console.log(url);
        setComponentLink(link, url.result.short_link);
    } catch (error) {
        console.error('Error')
    }
}

const setComponentLink = (linkValue, url) => {
    cont++;
    let divCompUrl = document.createElement('div'),
        pUrl = document.createElement('p'),
        divUrlShort = document.createElement('div'),
        pUrlShort = document.createElement('p'),
        btnCopy = document.createElement('button');

    divCompUrl.className = 'component-url';
    pUrl.className = 'url';
    divUrlShort.className = 'link-short';
    btnCopy.className = 'green-btn copy-btn';

    pUrl.textContent = linkValue;
    pUrlShort.textContent = url;
    btnCopy.textContent = 'Copy';

    divUrlShort.append(pUrlShort, btnCopy);
    divCompUrl.append(pUrl, divUrlShort);
    urlsComponent.appendChild(divCompUrl);

    if(cont > 0) {
        const btnCopy = document.querySelectorAll('.copy-btn');
        console.log(btnCopy)
        btnCopy.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let buttonCopy = e.target;
                let urlShort = buttonCopy.parentNode.firstChild;
                copyUrl(urlShort.textContent);
                btn.textContent = 'Copied!'
            })
        })
    }
}

const copyUrl = (shortUrl) => {
    let tempInput = document.createElement ("input"); 
    tempInput.value = shortUrl;
    document.body.appendChild(tempInput); 
    tempInput.select(); 
    document.execCommand("copy"); 
    document.body.removeChild(tempInput);
    
}


btnShorten.addEventListener('click', () => {
    let linkInput = document.querySelector(".link");
    linkInput = linkInput.value;
    getLinkShort(linkInput);
    console.log(cont);
});
