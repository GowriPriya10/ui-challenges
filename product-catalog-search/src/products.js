export default class Products {

    BASE_URL = 'https://dummyjson.com/products';

    constructor() {}

    async getProducts() {
        try {
            const products = (await fetch(this.BASE_URL)).json();
            return products;
        }catch (e) {
            return e;
        }
    }

    async searchProducts(input) {
        try {
            const products = (await fetch(`${this.BASE_URL}/search?q=${input}`)).json();
            return products;
        }catch (e) {
            return e;
        }
    }

    debounceSearchProducts(func, wait = 1000) {
        let timer;
      
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              func.apply(this, args);
            }, wait)
        }
    }
}
