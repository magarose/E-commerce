var express = require('express');
var router = express.Router();
var axios = require('axios');
var products = { categories: [], items: [] };

router.get('/api/items', function (req, res) {
    const busquedaProducto = req.query.search
    products.categories = [];
    products.items = []
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + busquedaProducto + '&limit=4')
        .then(result => {
            result.data.results.map(function (product) {

               let productos =  {
                    id: product.id,
                    title: product.title,
                    price: {
                        currency: product.currency_id,
                        amount: String(product.price).split('.')[0],
                        decimals: String(product.price).split('.')[1] || '0',
                    },
                    free_shipping: product.shipping.free_shipping,
                    thumbnail: product.thumbnail,
                    condition: product.condition,
                    location:  product.address.city_name
                }
                products.items.push(productos);
            })

            const filters = result.data.filters
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].id === 'category') {
                    const category = filters[i].values[0].path_from_root
                    for (let x = 0; x < category.length; x++) {
                        products.categories.push(category[x].name)


                    }

                }
            }

            res.json(products)
        })

    })
    router.get('/api/items/:id', function (req, res, next) {
        const id = req.params.id;
        let product = {};
        let productDescription = {};
        axios
       .get('https://api.mercadolibre.com/items/' + id)
       .then(result => {
           product = result.data;
           return axios.get('https://api.mercadolibre.com/items/' + id + '/description')
           })
           .then(result => {
              productDescription = result.data;
              const category = product.category_id;
              return axios.get('https://api.mercadolibre.com/categories/' + category)
           })
           .then(resultCategory => {
               let resultProduct = {
                 categories:resultCategory.data.path_from_root,
                 item: {
                   id: product.id,
                   title: product.title,
                   price: {
                     currency: product.currency_id,
                     amount: String(product.price.amount).split('.')[0],
                     decimals:String(product.price.decimals).split('.')[1] || '0',
                   },
                   picture: product.thumbnail,
                   condition: product.condition,
                   free_shipping: product.shipping.free_shipping,
                   sold_quantity: product.sold_quantity,
                   description: productDescription.plain_text
                 }
               }

               res.json(resultProduct);
        })
    })


module.exports = router;