import Parse from 'parse/node';

// new Role
// --------------------------------
// var roleACL = new Parse.ACL();
// roleACL.setPublicReadAccess(true);
// var role = new Parse.Role('Administrator', roleACL);
// role.save();

// add user to role
// --------------------------------
// var roleACL = new Parse.ACL();
// var role = new Parse.Role('Moderators', roleACL);
// // Query User
// var queryUser = new Parse.Query(Parse.User);
// queryUser.equalTo('username', 'bun');
// queryUser.first()
//   .then(user => {
//     role.getUsers().add(user);
//     role.save();
//     return;
//   })
//   .catch(console.error);

// security objects
// -------------------------------
// var report = new Parse.Object('Report');
// var roleACL = new Parse.ACL();
// roleACL.setRoleReadAccess('Moderators', true);
// report.setACL(roleACL);
// report.set('title', 'Report sales today');
// report.save();

// Role Hierarchy
// --------------------------------
var roleQuery = new Parse.Query(Parse.Role);
var administratorsQuery =  new Parse.Query(Parse.Role).equalTo('name', 'Administrator');
var moderatorsQuery =  new Parse.Query(Parse.Role).equalTo('name', 'Moderators');

// administratorsQuery.first()
//   .then(administrators => {
//     console.log(administrators);
//   })
//   .catch(console.error);

Promise.all([
  administratorsQuery.first({useMasterKey: true}),
  moderatorsQuery.first({useMasterKey: true})
])
.then(([administrators, moderators]) => {
  // console.log(moderators);
  moderators.getRoles().add(administrators);
})
.catch(console.error);