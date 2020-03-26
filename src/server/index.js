// Spagetti style 

const middleWare = require('./middleware/middleware');
const constants = require('./constants/constants');
const queries = require('./queries/queries');
const { Client } = require('pg');
const express = require('express');
const MongoClient = require('mongodb').MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
const assert = require('assert');
const fs = require('fs');
const app = express();
const webSocket = express();
let mongo;
const commonLines = [];
const users = [];
const rooms = [{
  id: 1,
  type: "General",
  name: "General chat",
  participants: [],
  messages: [],
}];

const client = new Client({
  // user: 'postgres',
  // host: 'localhost',
  // database: 'students',
  // password: 'password',
  // port: 5432,
  connectionString: constants.connectionString,
})

MongoClient.connect(function (err, mongoClient) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  mongo = mongoClient;
});

const webSocketServer = webSocket.listen(3001, () => {
  console.log(`Websocket running on port 3001`);
});

app.listen(constants.port, () => {
  client.connect();

  fs.appendFile('log.txt', `${new Date()} server run` + "\n", error => {
    if(error){
      console.log(error);
    }else{
      console.log("success");
    }
  })
  console.log(`App running on port ${constants.port}.`);
  console.log(`connect with BD`);
});

const io = require('socket.io')(webSocketServer);
io.sockets.on('connection', socket => {
  console.log('new user connected');

  socket.on("INIT_USER", teacher => {
    users.push(teacher);

    const db = mongo.db(constants.mongoDataBaseName);
    db.collection(constants.mongoCollectionName).find({ "login": teacher.login }).toArray()
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          if (teacher.login === result[i].login) {
            db.collection(constants.mongoCollectionName).updateOne(
              { "login": teacher.login },
              {
                '$set': {
                  "device": teacher.device,
                  "geo": teacher.latitude + " : " + teacher.longitude,
                  "city": teacher.city,
                  "ip": teacher.ip,
                  "browser": teacher.browser,
                },
                '$inc': { session: 1 }
              }
            )
            return false;
          }
        }
        db.collection(constants.mongoCollectionName).insertOne({
          "login": teacher.login,
          "session": 1,
          "mode": {
            "table": 0,
            "calculator": 0,
            "converter": 0,
            "paint": 0,
            "account": 0,
          },
          "CRUD": {
            "create": 0,
            "read": 0,
            "delete": 0,
            "update": 0,
          },
          "messages": 0,
          "device": teacher.device,
          "geo": teacher.latitude + " : " + teacher.longitude,
          "city": teacher.city,
          "ip": teacher.ip,
          "browser": teacher.browser,
        });
      }).catch(error => console.log(error));

    let userChats = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].type === "General") {
        rooms[i].participants.push({ ...teacher, isRead: true });
        userChats.push(rooms[i]);
      } else {
        for (let j = 0; j < rooms[i].participants.length; j++) {
          if (teacher.id === rooms[i].participants[j].id) {
            rooms[i].participants.push({ ...teacher, isRead: true });
            userChats.push(rooms[i]);
            break;
          }
        }
      }
    }

    users.forEach(item => users.length !== 0 ? io.sockets.sockets[item.socket].emit('SHOW_USERS', users) : null);
    socket.emit("SHOW_CHATS", userChats);
  })

  socket.on('ADD_PRIVATE_CHAT', dataChat => {
    for (let i = 0; i < users.length; i++) {
      if (dataChat.participants[0].id === users[i].id && dataChat.participants[0].socket !== users[i].socket) {
        dataChat.participants.push({ ...users[i], isRead: true });
      }
      if (dataChat.participants[1].id === users[i].id && dataChat.participants[1].socket !== users[i].socket) {
        dataChat.participants.push({ ...users[i], isRead: false });
      }
    }
    rooms.push(dataChat);

    for (let k = 0; k < dataChat.participants.length; k++) {
      let userChats = [];
      for (let j = 0; j < rooms.length; j++) {
        for (let y = 0; y < rooms[j].participants.length; y++) {
          if (dataChat.participants[k].socket === rooms[j].participants[y].socket) {
            userChats.push(rooms[j])
            break;
          }
        }
      }
      io.sockets.sockets[dataChat.participants[k].socket].emit('SHOW_CHATS', userChats);
      userChats.length = 0;
    }
  })

  socket.on('SEND_MESSAGE', messageData => {
    const db = mongo.db(constants.mongoDataBaseName);
    db.collection(constants.mongoCollectionName).find({ "login": messageData.login }).toArray()
      .then(result => {
        if (result.length > 0) {
          db.collection(constants.mongoCollectionName).updateOne(
            { login: messageData.login },
            { $inc: { "messages": 1 } }
          )
        }
      }).catch(error => console.log(error));

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === messageData.idRoom) {
        rooms[i].messages.push({ login: messageData.login, message: messageData.message });

        for (let j = 0; j < rooms[i].participants.length; j++) {
          if (rooms[i].participants[j].id === messageData.idTeacher) {
            rooms[i].participants[j].isRead = true;
          } else {
            rooms[i].participants[j].isRead = false;
          }
        }

        for (let u = 0; u < rooms[i].participants.length; u++) {
          let userChats = [];
          for (let k = 0; k < rooms.length; k++) {
            for (let y = 0; y < rooms[k].participants.length; y++) {
              if (rooms[i].participants[u].socket === rooms[k].participants[y].socket) {
                userChats.push(rooms[k]);
                break;
              }
            }
          }
          io.sockets.sockets[rooms[i].participants[u].socket].emit('SHOW_CHATS', userChats);
        }
        break;
      }
    }
  })

  socket.on("READ", dataChat => {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === dataChat.idChat) {
        for (let j = 0; j < rooms[i].participants.length; j++) {
          if (rooms[i].participants[j].id === dataChat.idTeacher) {
            rooms[i].participants[j].isRead = true;
          }
        }
        break;
      }
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === dataChat.idTeacher) {
        let userChats = [];
        for (let j = 0; j < rooms.length; j++) {
          for (let y = 0; y < rooms[j].participants.length; y++) {
            if (rooms[j].participants[y].socket === users[i].socket) {
              userChats.push(rooms[j]);
              break;
            }
          }
        }
        io.sockets.sockets[users[i].socket].emit('SHOW_CHATS', userChats);
      }
    }
  })

  socket.on("LEAVE_CHAT", idChat => {
    for (let i = rooms.length - 1; i >= 0; i--) {
      if (rooms[i].id === idChat) {
        let participants = rooms[i].participants;
        rooms.splice(i, 1);

        for (let j = 0; j < participants.length; j++) {
          let userChats = [];
          for (let k = 0; k < rooms.length; k++) {
            for (let y = 0; y < rooms[k].participants.length; y++) {
              if (participants[j].socket === rooms[k].participants[y].socket) {
                userChats.push(rooms[k]);
                break;
              }
            }
          }
          io.sockets.sockets[participants[j].socket].emit('SHOW_CHATS', userChats);
        }
        break;
      }
    }
  })

  socket.on('GET_DRAWS', teacher => { //must be fixed
    let exist = false;
    for(let i = 0; i < commonLines.length; i++){
      if(commonLines[i].id === teacher.id){
        teacher.lines = commonLines[i].lines;
        socket.emit('SHOW_DRAWED', commonLines[i].lines);
        if(commonLines[i].socket === teacher.socket){
          exist = true;
        }
      } 
    }
    if(!exist) commonLines.push(teacher);
  })

  socket.on('DRAW', data => {
    for(let i = 0; i < commonLines.length; i++){
      if(commonLines[i].id === data.id){
        commonLines[i].lines.push(data.lines);
        if(commonLines[i].socket !== data.socket){
          io.sockets.sockets[commonLines[i].socket].emit('SHOW_DRAWED', commonLines[i].lines);
        }
      }
    }
  })

  socket.on('CLEAR_CANVAS', data => {
    for(let i = 0; i < commonLines.length; i++){
      if(commonLines[i].id === data.id){
        commonLines[i].lines.length = 0;
        if(commonLines[i].socket !== data.socket){
          io.sockets.sockets[commonLines[i].socket].emit('SHOW_DRAWED', commonLines[i].lines);
        }
      }
    }
  })

  socket.on('disconnect', () => {
    //delete canvas
    for(let i = 0; i < commonLines.length; i++){
      if(commonLines[i].socket === socket.id){
        commonLines.splice(i, 1);
      }
    }

    //delete session
    for (let i = 0; i < users.length; i++) {
      if (users[i].socket === socket.id) {
        users.splice(i, 1);
        break;
      }
    }

    //delete from chats
    for (let i = rooms.length - 1; i >= 0; i--) {
      if (rooms[i].type === "General") {
        for (let j = 0; j < rooms[i].participants.length; j++) {
          if (rooms[i].participants[j].socket === socket.id) {
            rooms[i].participants.splice(j, 1);
            if (rooms[i].participants.length === 0) {
              rooms[i].messages.length = 0;
            }
            break;
          }
        }
      } else {
        for (let j = 0; j < rooms[i].participants.length; j++) {
          if (rooms[i].participants[j].socket === socket.id) {
            let idUser = rooms[i].participants[j].id;
            rooms[i].participants.splice(j, 1);
            let participants = rooms[i].participants;

            let exist = false;
            for (let y = 0; y < participants.length; y++) {
              if (idUser === participants[y].id) {
                exist = true;
                break;
              }
            }

            if (!exist) rooms.splice(i, 1);

            for (let h = 0; h < participants.length; h++) {
              let userChats = [];
              for (let k = 0; k < rooms.length; k++) {
                for (let l = 0; l < rooms[k].participants.length; l++) {
                  if (participants[h].socket === rooms[k].participants[l].socket) {
                    userChats.push(rooms[k]);
                    break;
                  }
                }
              }
              io.sockets.sockets[participants[h].socket].emit('SHOW_CHATS', userChats);
              userChats.length = 0;
            }
            break;
          }
        }
      }
    }
    users.forEach(item => io.sockets.sockets[item.socket].emit('SHOW_USERS', users));
  })
})


webSocket.use(
  middleWare.cors,
  express.json()
)

webSocket.get("/", (request, response) => {
  response.send("Hello, I am WebSocket");
})


var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(
  middleWare.cors,
  express.json()
);

app.get(constants.url.root, (request, response) => queries.sayHello(request, response));
app.post(constants.url.checkTeacher, (request, response) => queries.checkTeacher(request, response, client));
app.post(constants.url.insertTeacher, (request, response) => queries.insertTeacher(request, response, client));
app.post(constants.url.getGroups, (request, response) => queries.getGroups(request, response, client));
app.post(constants.url.getStudents, (request, response) => queries.getStudents(request, response, client));
app.post(constants.url.renameGroup, (request, response) => queries.renameGroup(request, response, client));
app.post(constants.url.createGroup, (request, response) => queries.createGroup(request, response, client));
app.post(constants.url.createStudent, (request, response) => {
  const db = mongo.db(constants.mongoDataBaseName);
  db.collection(constants.mongoCollectionName).find({ "login": request.body.teacherLogin }).toArray()
    .then(result => {
      if (result.length > 0) {
        db.collection(constants.mongoCollectionName).updateOne(
          { login: request.body.teacherLogin },
          { $inc: { "CRUD.create": 1 } }
        )
      }
    }).catch(error => console.log(error));
  queries.createStudent(request, response, client);
});
app.post(constants.url.clearGroup, (request, response) => queries.clearGroup(request, response, client));
app.post(constants.url.deleteGroup, (request, response) => queries.deleteGroup(request, response, client));
app.post(constants.url.updateStudent, (request, response) => {
  const db = mongo.db(constants.mongoDataBaseName);
  db.collection(constants.mongoCollectionName).find({ "login": request.body.teacherLogin }).toArray()
    .then(result => {
      if (result.length > 0) {
        db.collection(constants.mongoCollectionName).updateOne(
          { login: request.body.teacherLogin },
          { $inc: { "CRUD.update": 1 } }
        )
      }
    }).catch(error => console.log(error));
  queries.updateStudent(request, response, client);
})
app.post(constants.url.deleteStudent, (request, response) => {
  const db = mongo.db(constants.mongoDataBaseName);
  db.collection(constants.mongoCollectionName).find({ "login": request.body.teacherLogin }).toArray()
    .then(result => {
      if (result.length > 0) {
        db.collection(constants.mongoCollectionName).updateOne(
          { login: request.body.teacherLogin },
          { $inc: { "CRUD.delete": 1 } }
        )
      }
    }).catch(error => console.log(error));
  queries.deleteStudent(request, response, client);
});
app.post(constants.url.resetStudents, (request, response) => queries.resetStudents(request, response, client));
app.post(constants.url.resetGroups, (request, response) => queries.resetGroups(request, response, client));
app.post(constants.url.sendTime, (request, response) => {
  const db = mongo.db(constants.mongoDataBaseName);
  const { mode } = request.body;
  db.collection(constants.mongoCollectionName).find({ "login": request.body.teacherLogin }).toArray()
    .then(result => {
      if (result.length > 0) {
        switch(mode){
          case "table":{
            db.collection(constants.mongoCollectionName).updateOne(
              { login: request.body.teacherLogin },
              { $inc: { "mode.table": request.body.time } }
            )
            break;
          }
          case "account": {
            db.collection(constants.mongoCollectionName).updateOne(
              { login: request.body.teacherLogin },
              { $inc: { "mode.account": request.body.time } }
            )
            break;
          }
          case "calculator": {
            db.collection(constants.mongoCollectionName).updateOne(
              { login: request.body.teacherLogin },
              { $inc: { "mode.calculator": request.body.time } }
            )
            break;
          }
          case "paint": {
            db.collection(constants.mongoCollectionName).updateOne(
              { login: request.body.teacherLogin },
              { $inc: { "mode.paint": request.body.time } }
            )
            break;
          }
          case "converter": {
            db.collection(constants.mongoCollectionName).updateOne(
              { login: request.body.teacherLogin },
              { $inc: { "mode.converter": request.body.time } }
            )
            break;
          }
        }
      }
    }).then(() => response.send("Success"))
    .catch(error => console.log(error));
})

app.get(constants.url.getAdminData, (request, response) => {
  const db = mongo.db(constants.mongoDataBaseName);
  db.collection(constants.mongoCollectionName).find({}).toArray()
    .then(result => response.json(result))
    .catch(error => console.log(error));
})


//Must be fixed by Nicolay
app.post("/update_teacher", (req, res) => {
  client.query(`update teachers set
            login = '${req.body.login}',
            mail = '${req.body.mail}',
            phone = '${req.body.phone}'
            where id = ${req.body.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.rows);
      }
    })
});

app.post("/updateTeacher-addInfo", (req, res) => {
  client.query(`update teachers set
            addinfo = '${req.body.addinfo}'
            where id = ${req.body.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.rows);
        }
      })
});

app.post("/get-teacher", (req, res) =>
  client.query(`select * from teachers where id = ${req.body.id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.rows);
    }
  })
);

app.post("/send_image", (req, res) => {
  client.query(`update teachers set
            teacher_avatar = '${req.body.teacher_avatar}'
            where id = ${req.body.id}`,

    (err, result) => {

      if (err) {
        console.log(err);
      } else {
        console.log(res.send(result.rows));
      }
    })
});