export default class View {
    constructor() {
        this.catalogView = document.getElementById('catalog');
        this.searchInput = document.getElementById('search');
    }

    renderView(products) {
        this.catalogView.replaceChildren();
        if(products.length > 0){
            products.forEach(product => {
                const productCard = document.querySelector('#product').content.cloneNode(true);
                productCard.querySelector('#productCard').id += `-${product.id}`;
                productCard.querySelector('#thumbnail > img').src = product.thumbnail;
                productCard.querySelector('#title').replaceChildren(product.title);
                productCard.querySelector('#category > #brand').replaceChildren(product.brand);
                productCard.querySelector('#category > #category').replaceChildren(product.category);
                productCard.querySelector('#desc').replaceChildren(product.description);
                productCard.querySelector('#price').replaceChildren(`$${product.price}`);
                productCard.querySelector('#rating').replaceChildren(`☆ ${product.rating}/5`);
                this.catalogView.appendChild(productCard);
            })
        }else{
            this.catalogView.replaceChildren('No Product found...')
        }
    }

    initSearchListener(cb) {
        this.searchInput.addEventListener('keyup', (e) => {
            cb(e.target.value);
        })
    }
}
