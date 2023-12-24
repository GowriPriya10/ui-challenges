import '../styles.css';
import Observer from './Observer';

import Products from "./products";
import View from './view';

const ProductView = new View();

const ProductsCatalog = new Products();
const products = await ProductsCatalog.getProducts();

const debounceSearch = ProductsCatalog.debounceWithOptions(searchProductsController, 500, {leading: false, trailing: true});

ProductView.renderView(products.products);
ProductView.initSearchListener(debounceSearch);

async function searchProductsController(input) {
    if(input) {
        const products = await ProductsCatalog.searchProducts(input);
        ProductsCatalog.totalCount = products.total;
        ProductView.suggestionsOverlayRenderer(products.products);
        // ProductView.renderView(products.products);
    }else {
        ProductView.suggestionsOverlay.classList.remove('show-overlay');
    }
}

Observer(document.querySelector('#suggOverlay'), document.getElementById('loadMore'), async (entries) => {
    if(entries.some(entry => entry.isIntersecting)){

        const offset = document.querySelectorAll('.suggestionItem').length;
        const searchInput = document.querySelector('#search').value;

        if(searchInput && offset !== ProductsCatalog.totalCount){
            const products = await ProductsCatalog.searchProducts(searchInput, {skip: offset, limit: 10});
            products.products.forEach((product) => {
                ProductView.renderSuggestionItem(product);
            })
        }
    }
})
