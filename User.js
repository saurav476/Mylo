const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'test',
  'root',
 'Goy@l1234',
 {dialect:'mysql',
  host:'localhost'
  }
);
sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
let user=sequelize.define('user',{
  UserId:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
let temp=[{UserId:"a"},
{UserId:"b"},
{UserId:"c"},];
sequelize.sync({ force: true }).then(() => {
user.bulkCreate(temp, { validate: true }).then(() => {
console.log('notes created');
}).catch((err) => {
console.log('failed to create notes');
console.log(err);
})
}); 
module.exports=user;