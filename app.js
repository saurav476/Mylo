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
const redis=require("redis");
const client=redis.createClient();
const{promisify}=require("util");
const GET=promisify(client.get).bind(client);
const SET=promisify(client.set).bind(client);
client.on("error",function(error)
{
  console.log("error encountered",error);
});
client.on("connect",function(error)
{
  console.log("connection established");
});
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Goy@l1234',
  database : 'test'
});
app.use(express.json());
app.use(express.urlencoded({extended : false}));
connection.connect((err) => {
    if(err) console.log("error occured",err);
    console.log('Connected to MySQL Server!');
});
/*
client.flushdb( function (succeeded) {
  console.log(succeeded); // will be true if successfull
});*/
app.get('/permi',(req,res) => {
  let input=req.body;
  let stringInput=JSON.stringify(input);
  try{
  client.get(stringInput,function (err, obj) {
    if(!obj)
     {
      let x=req.body;
      x=x.user;
      let y=req.body;
      y=y.permission;
      let input=req.body;
      const query2 = "select TypeOfFeature from role_permission_feature inner join user_role on role_permission_feature.TypeOfUser=user_role.TypeOfUser where PermiId="+ mysql.escape(y)+ "and user_role.UserId= " + mysql.escape(x);
      connection.query(query2, (err, result) => {
          if(err) throw err;
          if(result.length===0)
          res.send("User dont have access to any feature");
          else
          {
            let copy=JSON.stringify(result);
            client.set(stringInput,copy,'EX',1800);
            res.json(result);}
    }
    );}
     else
    {
      let output=JSON.parse(obj);
      console.log("getting from Redis");
      res.json(output);
      return;
    }
 });
}
catch{
  console.log("error in getting");
}
});
app.listen(5000, () => {
  console.log('Server is running at port 5000');
});













/*
app.get('/permi',(req,res) => {
  let x=req.body;
  x=x.user;
  let y=req.body;
  y=y.permission;
  let input=req.body;
  let stringInput=JSON.stringify(input);
  const query2 = "select TypeOfFeature from role_permission_feature inner join user_role on role_permission_feature.TypeOfUser=user_role.TypeOfUser where PermiId="+ mysql.escape(y)+ "and user_role.UserId= " + mysql.escape(x);
 // console.log(stringInput);
  connection.query(query2, (err, result) => {
      if(err) throw err;
      if(result.length===0)
      res.send("User dont have access to any feature");
      else
      {
       console.log(JSON.stringify(result));
        client.hmset(stringInput,JSON.stringify(result),'EX',3600);
        res.json(result);}
  });
});*/



















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