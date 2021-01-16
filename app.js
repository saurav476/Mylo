// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//     'test',
//     'root',
//    'Goy@l1234',
//    {dialect:'mysql',
//     host:'localhost'
//     }
// );
// global.sequelize=sequelize;
// sequelize.authenticate().then(() => {
//   console.log('Connection established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });
//let User=require('./User');
//let Role=require('./Roles');
//let Permission=require('./Permission');
//let Feature=require('./Feature');
const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Goy@l1234',
  database : 'test'
});

app.use(express.json());

app.use(express.urlencoded({extended : false}));
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

app.get('/home',(req,res) => {
    let x=req.body;
    x=x.user;
    const query1 = 'select TypeOfFeature from final inner join userrole on final.TypeOfUser=userrole.TypeOfUser where userrole.UserId = ' + mysql.escape(x) ;
    connection.query(query1, (err, result) => {
        if(err) throw err;
        if(result.length===0)
        res.send("User dont have access to any feature");
        else
        res.json(result);
    });
});
app.get('/permi',(req,res) => {
  let x=req.body;
  x=x.user;
  let y=req.body;
  y=y.permission;
  const query2 = "select TypeOfFeature from final2 inner join userrole on final2.TypeOfUser=userrole.TypeOfUser where  PermiId="+ mysql.escape(y)+ "and  userrole.UserId= " + mysql.escape(x) ;
  console.log(query2);
  connection.query(query2, (err, result) => {
      if(err) throw err;
      if(result.length===0)
      res.send("User dont have access to any feature");
      else
      res.json(result);
  });
});
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});


















/*
let user=sequelize.define('user',{
  UserId:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
let roles=sequelize.define('roles',{
  TypeOfUser:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
let permission=sequelize.define('permission',{
  PermiId:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
let feature=sequelize.define('feature',{
  Type:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});
const errHandler=(err)=>{
  console.log(err);
}
// insert data in users
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
  // insert data in roles
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
// insert data in features
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
// insert data in permission
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
roles.sync().then(() => {
  console.log('New table created');
});*/