function sayHello(request, response) {
    response.send("Hello world");
}

function checkTeacher(request, response, client) {
    client.query(`select * from teachers where login = '${request.body.login}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response.send(result.rows);
        }
    })
}
function insertTeacher(request, response, client) {
    client.query(`INSERT INTO teachers(login, password, mail, phone, keyword, addinfo, createddate, role)
    values ('${request.body.login}', '${request.body.password}', '${request.body.mail}', '${request.body.phone}', '${request.body.keyWord}', '${request.body.addinfo}', NOW(), 'teacher')`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response.send(result.rows);
        }
    })
}

function getGroups(request, response, client) {
    client.query(`select * from edu_groups where teacher_id = ${request.body.id} order by createddate`, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            response.send(res.rows);
        }
    })
}

function getStudents(request, response, client) {
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
}

function renameGroup(request, response, client) {
    client.query(`update edu_groups
    set group_name = '${request.body.name}'
    where id = ${request.body.id}`, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            response.send("Success");
        }
    })
}

function createGroup(request, response, client) {
    client.query(`insert into edu_groups(group_name, teacher_id, createddate)
    values ('${request.body.name}', ${request.body.idTeacher}, NOW())`,
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                response.send("Success");
            }
        })
}

function updateTeacher(request, response, client) {
    client.query(`UPDATE teachers SET
    login = '${request.body.login}',
    password = '${request.body.password}',
    phone = '${request.body.phone}',
    WHERE id = '${request.body.id}')`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                response.send(result.rows);
            }
        })
}

function createStudent(request, response, client) {
    client.query(`insert into students(firstname, lastname, age, city, group_id, createddate) 
    values ('${request.body.firstName}', '${request.body.lastName}', ${request.body.age}, '${request.body.city}', ${request.body.idGroup}, NOW())`,
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                response.send("Success");
            }
        })
}

function clearGroup(request, response, client) {
    client.query(`delete from students where group_id = ${request.body.id}`,
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                response.send("Success");
            }
        })
}

function deleteGroup(request, response, client) {
    client.query(`delete from edu_groups where id = ${request.body.id}`,
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                response.send("Success");
            }
        })
}

function updateStudent(request, response, client) {
    client.query(`update students
    set firstname = '${request.body.firstName}',
    lastname = '${request.body.lastName}',
    age = ${request.body.age},
    city = '${request.body.city}'
    where id = ${request.body.id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response.send("Success");
        }
    })
}

function deleteStudent(request, response, client) {
    client.query(`delete from students 
    where id = ${request.body.id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response.send("Success");
        }
    })
}

function resetStudents(request, response, client) {
    const length = request.body.length;
    if(length === 0) return response.send("");

    let conditionString = `WHERE group_id = ` + request.body[0].id;
    for (let i = 1; i < length; i++){
        conditionString += ` OR group_id = ` + request.body[i].id;
    }

    client.query(`delete from students
    ${conditionString}`, (err, result) => {
        if(err){
            console.log(err)
        }else{
            response.send("Success");
        }
    })
}

function resetGroups(request, response, client){
    client.query(`delete from edu_groups 
    where teacher_id = ${request.body.id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response.send("Success");
        }
    })
}

module.exports = {
    sayHello,
    checkTeacher,
    insertTeacher,
    getGroups,
    getStudents,
    renameGroup,
    createGroup,
    updateTeacher,
    createStudent,
    clearGroup,
    deleteGroup,
    updateStudent,
    deleteStudent,
    resetStudents,
    resetGroups,
}