const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'test',
  'root',
 'Goy@l1234',
 {dialect:'mysql',
  host:'localhost'
  }
);
let roles=sequelize.define('roles',{
  TypeOfUser:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
let temp0=[{TypeOfUser:"admin"},
            {TypeOfUser:"moderate"},
            {TypeOfUser:"user"},]; 
sequelize.sync({ force: true }).then(() => {
 roles.bulkCreate(temp0, { validate: true }).then(() => {
      console.log('notes created');
  }).catch((err) => {
      console.log('failed to create notes');
      console.log(err);
  })
}); 
module.exports=roles;