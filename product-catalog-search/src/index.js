import '../styles.css';

import Products from "./products";
import View from './view';

const ProductView = new View();

const ProductsCatalog = new Products();
const products = await ProductsCatalog.getProducts();

const debounceSearch = ProductsCatalog.debounceSearchProducts(searchProductsRenderer, 500);

ProductView.renderView(products.products);
ProductView.initSearchListener(debounceSearch);

async function searchProductsRenderer(input) {
    const products = await ProductsCatalog.searchProducts(input);
    ProductView.renderView(products.products);
}
