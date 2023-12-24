export default class Products {

    BASE_URL = 'https://dummyjson.com/products';

    constructor() {
        this.totalCount = 0;
    }

    async getProducts() {
        try {
            const products = (await fetch(this.BASE_URL)).json();
            return products;
        }catch (e) {
            return e;
        }
    }

    async searchProducts(input, params = null) {
        let url = `${this.BASE_URL}/search?q=${input}`;

        if(params) {
            if(params.skip)
                url = url.concat(`&skip=${params.skip}`);

            if(params.limit)
                url = url.concat(`&limit=${params.limit}`)
        }

        try {
            const products = (await fetch(url)).json();
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

    debounceWithOptions(func, wait, option = {leading: false, trailing: true}) {
        let timer;
        let isLeadingInvoked = false;
    
        return function() {
    
        if(option.leading && !timer) { //timer is done but leading is true
          func.apply(this, arguments);
          isLeadingInvoked = true;
        }else {
            isLeadingInvoked = false;
        }
        
      clearTimeout(timer) //clear timeout for avoiding multiple timer instances
      
        timer = setTimeout(() => {
          if(option.trailing && !isLeadingInvoked) {
            func.apply(this, arguments)
          }
          timer = null; //reset timer
            }, wait);
        };
    }
}
