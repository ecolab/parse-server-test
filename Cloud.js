// https://github.com/ParsePlatform/ParseStore/blob/master/CloudTest/cloud/main.js
import Parse from 'parse/node';

Parse.Cloud.define('hello', (req, res) => {
  res.success('Hiiii');
});

// beforeSave
Parse.Cloud.beforeSave('Product', (req, res) => {
  // if (!req.object.get('name')) {
  //   res.error('name of product not null');
  // }
  
  let Product = Parse.Object.extend('Product');
  let ProductQuery = new Parse.Query(Product);
  return ProductQuery.equalTo('name', req.object.get('name'))
  .first()
  .then(product => {
    if (!product) return res.success();
    
    return res.error('Sản phẩm đã tồn tại');
  })
  .catch(console.error)
  
  // res.success();
});