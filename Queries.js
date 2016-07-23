import Parse from 'parse/node';

// Saving Objects
var Product = Parse.Object.extend('Product');
var product = new Product;
product.set('name', 'Áo phông 2');
product.set('price', 150000);
product.set('sold', false);

product.save(null)
.then(console.log)
.catch(console.error);

// Get one
// var query = new Parse.Query(Product);
// query.get('aOHVkjeEjj')
// .then(result => {
//     console.log(result.get('name'));
// })
// .catch(console.error);

// Find
// var query = new Parse.Query(Product);
// query.equalTo('name', 'Quần váy 2');
// query.find()
// .then(console.log)
// .catch(console.error);