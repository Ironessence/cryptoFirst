const hamburger = document.getElementById('hamburger');
const items = document.getElementById('items');

hamburger.addEventListener('click', (e) => {
    items.classList.toggle('active');

})
const list2 = document.querySelector('.top-gainers-section');
const list = document.querySelector('.most-popular-section');
let number = 10;

const showMore = document.getElementById('showMore');
showMore.addEventListener('click', () => {
    number = number * 2;
    list.innerText = '';
    list2.innerText = '';
    getCoins();
    getAllCoins();
    if (number >= 20) {
        number = 20;
    }

})








getCoins();
getAllCoins();

function getCoins() {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${number}&page=1&sparkline=false&price_change_percentage='1h%2C%2024h%2C%207d'`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let coins = data.map(el => el);

            // for (let i = 0; i < coins.length / 0.2; i++) {
            // coins.pop();
            // }

            displayCoins(coins);





        })
}



function displayCoins(coins) {



    coins.forEach(coin => {
        let card = document.createElement('div');
        card.classList.add('coin');
        let sym = document.createElement('h1');
        sym.classList.add('coin-name');
        let picture = document.createElement('img');
        picture.classList.add('coin-image');
        let price = document.createElement('h1');
        price.classList.add('coin-price');
        let priceChange = document.createElement('h3');
        priceChange.classList.add('coin-change-24h');

        sym.innerHTML = coin.symbol;
        picture.src = coin.image;
        price.innerHTML = '$ ' + coin.current_price;
        priceChange.innerHTML = coin.price_change_percentage_24h + ' %';
        if (coin.price_change_percentage_24h > 0) {
            priceChange.style.color = 'green';
        } else {
            priceChange.style.color = 'red';
        }


        card.appendChild(sym);
        card.appendChild(picture);
        card.appendChild(price);
        card.appendChild(priceChange);
        list.appendChild(card);

    })



}


function getAllCoins() {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage='1h%2C%2024h%2C%207d'`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let coins = data.map(el => el);


            displayTopGainers(coins);




        })
}



function displayTopGainers(coins) {

    coins.sort((a, b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? -1 : 1);
    let top10 = coins.slice(0, 10);
    console.log(top10);
    top10.forEach(coin => {
        let card = document.createElement('div');
        card.classList.add('coin');
        let sym = document.createElement('h3');
        sym.classList.add('coin-name');
        let price = document.createElement('h1');
        price.classList.add('coin-price');
        let image = document.createElement('img');
        image.classList.add('coin-image');
        let value = document.createElement('h3');
        value.classList.add('coin-change-24h');

        sym.innerText = coin.symbol;
        price.innerText = '$ ' + coin.current_price;
        image.src = coin.image;
        value.innerText = coin.price_change_percentage_24h + ' %';
        if (coin.price_change_percentage_24h > 0) {
            value.style.color = 'green';
        } else {
            value.style.color = 'red';
        }

        card.appendChild(sym);
        card.appendChild(price);
        card.appendChild(image);
        card.appendChild(value);
        list2.appendChild(card);


    })






}




























