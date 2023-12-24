export default class View {
    constructor() {
        this.catalogView = document.getElementById('catalog');
        this.searchInput = document.getElementById('search');
        this.suggestionsOverlay = document.getElementById('suggOverlay');
        this.suggResultWrapper = document.getElementById('results');
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
            cb(e.target.value.trim());
        })
    }

    suggestionsOverlayRenderer(products) {
        if(products.length > 0){
            const suggFragment = document.createDocumentFragment();
            products.forEach((product) => {
                this.renderSuggestionItem(product, suggFragment);
            })
            this.suggResultWrapper.replaceChildren(suggFragment);
            
            this.suggestionsOverlay.classList.add('show-overlay');
        }else {
            this.suggestionsOverlay.classList.remove('show-overlay');
        }
    }

    renderSuggestionItem(item, parentNode = this.suggResultWrapper){
        const suggestionItem = document.getElementById('suggestionItemFrag').content.cloneNode(true);
        suggestionItem.querySelector('.suggestionItem').id = item.id;
        suggestionItem.querySelector('.suggestionItem').replaceChildren(`${item.brand} - ${item.title}`);
        parentNode.appendChild(suggestionItem);
    }
}
