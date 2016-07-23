import Parse from 'parse/node';

// One-To-One
var Customer = Parse.Object.extend('Customer');
var customer = new Customer();
customer.set('name', 'Áo phông 2');
customer.set('address', 'Ecopark');
customer.set('district', 'Văn Giang');
customer.set('province', 'Hưng Yên');
// User Relationship
var query = new Parse.Query(Parse.User);
query.first({
  sessionToken: 'r:147a7a3d8ecdebb3b7f626857779b71f'
})
.then(result => {
  customer.set('user', result);
  return customer.save();
})
.then(console.log)
.catch(console.error);
