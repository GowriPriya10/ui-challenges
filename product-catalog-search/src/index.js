import '../styles.css';

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
        ProductView.suggestionsOverlayRenderer(products.products);
        // ProductView.renderView(products.products);
    }else {
        ProductView.suggestionsOverlay.classList.remove('show-overlay');
    }
}
