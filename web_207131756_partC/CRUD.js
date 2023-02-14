const sql = require("./db");

//create New User
const createNewUser = function(req,res){
    if (!req.body) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
    return;
    }
    const newUser = {
    "FullName": req.body.FullName,
    "email": req.body.email,
    "PhoneNumber": req.body.PhoneNumber,
    "Age": req.body.Age,
    "gender": req.body.gender,
    "password": req.body.password
    };

    sql.query("INSERT INTO users SET ?", newUser, (err,mysqlres) => {
    if (err) {
    console.log("error: ", err);
    res.status(400).send({message: "error in creating user: " + err});
    return;
    }
    console.log("created user: ", { id: mysqlres.insertId, ...newUser });
    // res.render('userCreated');
    res.send('<script>alert("Welcome ' + req.body.FullName + '!"); window.location.href = "/sign_in";</script>');
    return;
    });
};

// update rate field in the specific volunteer that got rate, make the new rate as the average of the last rates and the new one.
const send_rate_crud = (req, res)=>{
    const id = req.body.id;
    const rate = req.body.rate;
    sql.query("UPDATE volunteering SET rate= (((rate * count_rates) + ?) / (count_rates + 1)) , count_rates = count_rates+1 WHERE id= ?" , [rate,id] , (err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        return;
    } );
}

module.exports = {createNewUser, send_rate_crud};