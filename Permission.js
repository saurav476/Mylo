const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'test',
  'root',
 'Goy@l1234',
 {dialect:'mysql',
  host:'localhost'
  }
);
let permission=sequelize.define('permission',{
  PermiId:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
let temp2=[{PermiId:"home"},
{PermiId:"community"},
{PermiId:"shop"},]; 
sequelize.sync({ force: true }).then(() => {
permission.bulkCreate(temp2, { validate: true }).then(() => {
console.log('notes created');
}).catch((err) => {
console.log('failed to create notes');
console.log(err);
})
}); 
module.exports=permission;