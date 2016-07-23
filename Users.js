import Parse from 'parse/node';

// Signing up
// ----------------------------------
var user = new Parse.User();
user.set('username', 'cu3');
user.set('password', 'laclac');
// user.set('email', '');

// user.set('mobilePhone', '0904907903');

// user.signUp(null)
//   .then(user => {
//     var Profile = Parse.Object.extend('Profile');
//     var profile = new Profile;
//     profile.set('name', 'Nguyễn Hồng Phúc');
//     profile.set('email', 'hongphuc0911@gmail.com');
//     profile.set('mobilePhone', '0904905903');
//     profile.set('address', 'Ecopark');
//     profile.set('district', 'Văn Giang');
//     profile.set('province', 'Hưng Yên');
//     profile.set('userAccount', user);

//     return profile.save();
//   })
//   .then(profile => {

//   })
//   .catch(console.error);

var Profile = Parse.Object.extend('Profile');
var profile = new Profile();
profile.set('name', 'Nguyễn Hồng Phúc');
profile.set('email', 'hongphuc0911@gmail.com');
profile.set('mobilePhone', '0904905903');
profile.set('address', 'Ecopark');
profile.set('district', 'Văn Giang');
profile.set('province', 'Hưng Yên');

// profile.save()
// .then(profile => {
//   user.set('profile', profile);
//   return user.save();
// })
// .then(console.log)
// .catch(console.error);

Promise.all([
  user.signUp(),
  profile.save()
])
.then(([user, profile]) => {
  user.set('profile', profile);
  profile.set('user', user);
  return Promise.all([
    user.save(),
    profile.save()
  ]);
})
.then(console.log)
.catch(console.error);

// Logging In
// ------------------------------------
// Parse.User.logIn('hieu', 'laclac')
//   .then(user => {
//     console.log(user.get('sessionToken'));
//   })
//   .catch(console.error);

// Current User
// ------------------------------------
// Parse.User.logOut().then(() => {
//   var currentUser = Parse.User.current();
//   console.log(currentUser);
// })
// .catch(console.error);

// Parse.User.become('r:147a7a3d8ecdebb3b7f626857779b71f')
// .then(user => {
//   console.log(user);
// })
// .catch(console.error);

// Querying
// ----------------------------------

// var query = new Parse.Query(Parse.User);
// query.find({
//   sessionToken: 'r:147a7a3d8ecdebb3b7f626857779b71f'
// })
// .then(result => {
//   console.log(result[0].get('email'));
// })
// .catch(console.error);
