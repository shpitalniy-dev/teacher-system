const {Pool, Client} = require('pg');
const connectionString = 'postgressql://postgres:Qazwsx123@localhost:5432/usersdb';

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const client = new Client({
  connectionString:connectionString,
})

app.listen(port, () => {
  client.connect();
  console.log(`App running on port ${port}.`);
  console.log(`connect with BD`);
})

app.use(function(req, res, next) {
  //console.log("USE");
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
//app.use(express.json());

app.post('/read', (request, response) => {
  client.query(`select students.id, students.firstName, students.lastName, students.age, students.city, edu_groups.id as group_id, edu_groups.group_name
    from students right join edu_groups on students.group_id = edu_groups.id
    where edu_groups.teacher_id = ${request.body.id}`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      response.send(res.rows);
    }
  });
});

app.post('/insert', (request, response) => {
  client.query(`INSERT INTO students(firstName, lastName, age, city, group_id) VALUES ('${request.body.firstName}', '${request.body.lastName}', ${request.body.age}, '${request.body.city}', ${request.body.idGroup})`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json("Value was inserted in data base");
    }
  })
});


app.post('/update', (request, response) => {
  client.query(`update students 
    set firstname = '${request.body.firstName}',
    lastname = '${request.body.lastName}',
    age = ${request.body.age},
    city = '${request.body.city}'
    where id = ${request.body.id}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json("Value was updated in data base");
    }
  })
});

app.post('/delete', (request, response) => {
  client.query(`delete from students where id = ${request.body.id}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json("Value was deleted in data base");
    }
  })
});

app.post('/check', (request, response) => {
  client.query(`select * from teachers where login = '${request.body.login}'`, (err, res) => {
    if(err){
      console.log(err);
    }else{
      response.json(res.rows);
    }
  })
});

app.post('/insert_teacher', (request, response) => {
  client.query(`INSERT INTO teachers(login, password, mail, phone, keyword) VALUES ('${request.body.login}', '${request.body.password}', '${request.body.mail}', '${request.body.phone}', '${request.body.keyWord}')`, (err, res) => {
    if(err){
      console.log(err);
    }else{
      response.json("Value was inserted in data base");
    }
  })
});


app.post('/rename-group', (request, response) => {
  client.query(`UPDATE edu_groups SET group_name = '${request.body.groupName}' where id = ${request.body.idGroup}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json("Group was renamed");
    }
  })
});

app.post('/create-group', (request, response) => {
  client.query(`insert into edu_groups(group_name, teacher_id) 
  values ('${request.body.groupName}', ${request.body.idTeacher})`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json("Group was created");
    }
  })
});

app.post('/delete-students', (request, response) => {
  client.query(`delete from students
  where group_id = ${request.body.idGroup}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json("Students were deleted");
    }
  })
});

app.post('/delete-group', (request, response) => {
  client.query(`delete from edu_groups
  where id = ${request.body.idGroup}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json("Group was deleted");
    }
  })
});