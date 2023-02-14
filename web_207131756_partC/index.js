const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const sql = require('./db');
const port=3000;
const CRUD = require('./CRUD')
const createDB = require('./createDB');
const CSVToJSON = require('csvtojson');
const functions = require('./functions');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//UsersDataBase
app.get('/CreateUsersTable',createDB.CreateUsersTable);
app.get('/ShowUsersTable', createDB.ShowTable);
app.get('/DropUsersTable', createDB.DropTable);

//VolunteeringDataBase
app.get('/CreateVolunteeringTable', createDB.CreateVolunteeringTable);
app.get("/InsertData", createDB.InsertData);
app.get('/ShowVolunteeringTable', createDB.ShowVolunteeringTable);
app.get('/DropVolunteeringTable', createDB.DropVolunteeringTable);


//create DB
app.get('/createDB', (req, res) => {
    res.render('createDB');
    });


//Route
app.get('/', (req,res)=>{
    res.render('main')
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in')
});

app.get('/sign_up', (req, res) => {
    res.render('sign_up')
  });

app.get('/Search', (req, res) => {
    res.render('search')
 });

app.get('/result', (req, res) => {
    res.render('result')
 });

app.get('/rate', (req, res) => {
    res.render('rate')
});

app.get('/results', (req, res) => {
    res.render('results');
  });


//create new user
app.post("/createNewUser", CRUD.createNewUser);

//sendRank
app.post('/sendRank', CRUD.send_rate_crud);


// global boolean
let isUserLoggedIn  = false;

//login
app.post("/confirm_user", function(request, response) {
    let FullName = request.body.FullName;
    let email= request.body.email;
    let password = request.body.password;
    if (!request.body) {
        response.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // Ensure the input fields exists and are not empty
    if (FullName && password) {
        let loginTime = new Date().getTime();
        let logoutTime = loginTime + 10 * 60 * 1000; // 10 minutes in milliseconds
        isUserLoggedIn = functions.checkLoginStatus(logoutTime);
        sql.query('SELECT * FROM users WHERE FullName = ? AND password = ? AND email= ?', [FullName, password, email], function(error, results, fields) {
            if (error) throw error;
            //If the account exists
            if (results.length > 0) {
                console.log(FullName)
                response.send('<script>alert("Welcome ' + request.body.FullName + '!"); window.location.href = "/search";</script>');
            } else {
                response.send('<script>alert("Incorrect Username or Password!"); window.location.href = "/sign_in";</script>');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
    });

// send rate
app.post("/send_rate", function(req, res) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // Extract Rate
    const s1Checked = document.getElementById("1").checked ? 1 : 0;
    const s2Checked = document.getElementById("2").checked ? 2 : 0;
    const s3Checked = document.getElementById("3").checked ? 3 : 0;
    const s4Checked = document.getElementById("4").checked ? 4 : 0;
    const s5Checked = document.getElementById("5").checked ? 5 : 0;
    const rate = s1Checked + s2Checked + s3Checked + s4Checked + s5Checked;

    requestBody = {
        "id": id,
        "rate": rate
    }

  // Send request to sever
    const xhr = new XMLHttpRequest();
    xhr.open("POST","/send_rate_crud");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({requestBody}));
    console.log("im in js");
});



//Find Volunteer Match
app.post("/FindVolunteerMatch", function(request, response) {
    let volunteer_field = request.body.volunteer_field;
    let city = request.body.city;
    let lat = request.body.lat;
    let long = request.body.long;
    let distance = request.body.distance;
	if (city && volunteer_field && isUserLoggedIn) {
        sql.query('SELECT * FROM volunteering WHERE city = ? AND volunteer_field = ?', [city, volunteer_field], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                response.render('results', {
                    pple: results
                });
            } else {
                response.send('<script>alert("Sorry, we didnt find a good match for you. you may try another search details"); window.location.href = "/search";</script>');
            }
            response.end();
        });

        } else if (lat && long && volunteer_field && !city && isUserLoggedIn) {
            sql.query('SELECT * FROM volunteering WHERE volunteer_field = ?', [volunteer_field], function(error, results, fields) {
        		if (error) throw error;
        		if (results.length > 0) {
                    console.log("distance:", distance);
                    results.forEach((bs, index) => {
                        bs.distance = functions.getDistanceFromLatLonInKm(lat, long, bs.lat_, bs.long_);
                    });
                    results = results.filter(element =>
                        element.distance <= distance
                    )
                    if (results.length == 0) {
                        response.redirect('/NoMatchFound');
                    }
                    else {
                        // Redirect to volunteerOption
                        response.render('results', {
                            pple: results
                        });
                    }
        		} else {
        			response.redirect('/NoMatchFound');
        		}
        		response.end();
        	});
        } else {
        response.send('<script>alert("Please enter username and password"); window.location.href = "/sign_in";</script>');
        response.end();
        }
         });



app.listen(port, ()=>{
    console.log("app is running on port " + port);
});