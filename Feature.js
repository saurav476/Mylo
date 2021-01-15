const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'test',
  'root',
 'Goy@l1234',
 {dialect:'mysql',
  host:'localhost'
  }
);
let feature=sequelize.define('feature',{
  Type:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
let temp1=[{Type:"h1"},
{Type:"h2"},
{Type:"h3"},
{Type:"c1"},
{Type:"c2"},
{Type:"c3"},
{Type:"s1"},
{Type:"s2"},
{Type:"s3"},]; 
sequelize.sync({ force: true }).then(() => {
feature.bulkCreate(temp1, { validate: true }).then(() => {
console.log('notes created');
}).catch((err) => {
console.log('failed to create notes');
console.log(err);
})
}); 
module.exports=feature;