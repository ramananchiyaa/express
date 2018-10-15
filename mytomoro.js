var express = require('express');
var app = express();
app.use(express.urlencoded());

var mysql = require('mysql');
var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'sriramanan',
        port:'3306'
})


app.get('/Home',function(req,res){
    res.sendFile(__dirname + "/" +"new.html")});

    app.post('/old', function(req,res){
        var createNames = {
            fName: req.body.fName,
            lName: req.body.lName,
            age: req.body.age,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            pNumber: req.body.pNumber,
            email: req.body.email,
        }
        console.log("Database is connected..");
        connection.query("insert into FORMS set ?",createNames, function(err, result){
    
            if(err)throw err;
            console.log(result);
            // res.send(result);
            res.sendFile(__dirname + "/" +"new.html");
            
            
        })    
    });



app.get('/update', function (req, res) {
    res.sendFile( __dirname + "/" + "update.html" );
        });

        app.post('/update/:fName', function(req, res) {
            var createNames = {
                fName: req.body.fName,
                lName: req.body.lName,
                age: req.body.age,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                pNumber: req.body.pNumber,
                email: req.body.email,
            }
            connection.query('update FORMS SET lName = ?, age = ? gender = ?, dateOfBirth = ?, pNumber = ?, email = ? where fName=?',createNames, function(err,res){
             if(err) throw err;
             console.log('Updated!');
            });
            connection.query("select * from FORMS", function (err, result) {
        
              if (err) throw err;
              console.log(result);
              res.send(result);
            });
          });

         
app.get('/select', function (req, res) {
    res.sendFile( __dirname + "/" + "select.html" );
        });
            
        app.post('/select/:fName', function(req, res){
            connection.query("select * from FORMS where fName=?",req.body.fName, function (err, result) {
              if (err) throw err;
              console.log(result);
              res.send(result);
            })
         })



app.get('/delete', function (req, res) {
    res.sendFile( __dirname + "/" + "delete.html" );
        })

        app.post("/delete/:fName" , function (req, res) {
            connection.query("delete from FORMS where fName=?",req.body.fName, function (err, result) {
        
              if (err) throw err;
              console.log('Deleted!')
              console.log(result);
              res.send(result);
            })
            connection.query("select * from FORMS", function (err, result) {
        
              if (err) throw err;
              console.log(result);
            })
            });


var server = app.listen(8081, function(){
    var host = server.address().address
        var port = server.address().port            
            console.log("Example app listening at http://%s:%s",host,port)
            })