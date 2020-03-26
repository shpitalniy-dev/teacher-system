const middleWare = require('./middleware/middleware');
const constants = require('./constants/constants');
const queries = require('./queries/queries');
const { Client } = require('pg');
const express = require('express');
const app = express();
const client = new Client({
  // user: 'postgres',
  // host: 'localhost',
  // database: 'students',
  // password: 'password',
  // port: 5432,
  connectionString: constants.connectionString,
})
module.exports = {
  client
}

app.listen(constants.port, () => {
  client.connect();
  console.log(`App running on port ${constants.port}.`);
  console.log(`connect with BD`);
})

app.use(function (req, res, next) {
  //console.log("USE");
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
    express.json()
);

app.get("/", queries.sayHello);

app.post("/check", (req, res) =>
  client.query(`select * from teachers where login = '${req.body.login}'`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.rows);
    }
  })
);

app.get("/vlad-get", (req, res) =>
  client.query(`select * from teachers`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.rows);
    }
  })
);

app.post("/insert_teacher", (req, res) =>
  client.query(`INSERT INTO teachers(login, password, mail, phone, keyword, addinfo)
                  values ('${req.body.login}', '${req.body.password}', '${req.body.mail}', '${req.body.phone}', '${req.body.keyword}', '${req.body.addinfo}')`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.rows);
    }
  })
);

app.post("/get-groups", (request, response) => {
  client.query(`select * from edu_groups where teacher_id = ${request.body.id} order by createddate`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      response.send(res.rows);
    }
  })
})

app.post("/get-students", (request, response) => {
  client.query(`select students.id, students.firstname, students.lastname, students.age, students.city, students.group_id
  from students inner join edu_groups on students.group_id = edu_groups.id
  where edu_groups.teacher_id = ${request.body.id}
  order by students.createddate`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      response.send(res.rows);
    }
  })
})

app.post("/rename-group", (request, response) => {
  client.query(`update edu_groups
  set group_name = '${request.body.name}'
  where id = ${request.body.id}`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      response.send("Success");
    }
  })
});

app.post("/create-group", (request, response) => {
  client.query(`insert into edu_groups(group_name, teacher_id, createddate)
    values ('${request.body.name}', ${request.body.idTeacher}, NOW())`, 
    (err, res) => {
    if(err){
      console.log(err);
    }else{
      response.send("Success");
    }
  })
})
app.put("/update_teacher",  (req, res) =>
    client.query(`UPDATE teachers SET
            login = '${req.body.login}',
            password = '${req.body.password}',
            phone = '${req.body.phone}',
            WHERE id = '${req.body.id}')`,
    (err, result) => {
       if(err){
           console.log(err);
       }else{
           res.send(result.rows);
       }
   })
);

app.post("/create-student", (request, response) => {
  client.query(`insert into students(firstname, lastname, age, city, group_id, createddate) 
  values ('${request.body.firstName}', '${request.body.lastName}', ${request.body.age}, '${request.body.city}', ${request.body.idGroup}, NOW())`, 
    (err, res) => {
    if(err){
      console.log(err);
    }else{
      response.send("Success");
    }
  })
})

app.post("/clear-group", (request, response) => {
  client.query(`delete from students where group_id = ${request.body.id}`, 
    (err, res) => {
    if(err){
      console.log(err);
    }else{
      response.send("Success");
    }
  })
})

app.post("/delete-group", (request, response) => {
  client.query(`delete from edu_groups where id = ${request.body.id}`, 
    (err, res) => {
    if(err){
      console.log(err);
    }else{
      response.send("Success");
    }
  })
})

app.post("/update-student", (request, response) => {
  client.query(`update students
  set firstname = '${request.body.firstName}',
  lastname = '${request.body.lastName}',
  age = ${request.body.age},
  city = '${request.body.city}'
  where id = ${request.body.id}`, (err, result) => {
    if(err){
      console.log(err);
    }else{
      response.send("Success");
    }
  })
})

app.post("/delete-student", (request, response) => {
  client.query(`delete from students 
  where id = ${request.body.id}`, (err, result) => {
    if(err){
      console.log(err);
    }else{
      response.send("Success");
    }
  })
})
