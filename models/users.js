const bcrypt = require('bcryptjs');
const sqlcon = require('./../config/database');

module.exports.getUserByID = function (id,callback) {
    sqlcon.connection.query("SELECT * FROM user WHERE email='"+id.toString()+"'", function (error, results, fields) {
        if (error) throw error;
        if (results.length===0){
            console.log("User not found");
        }
        else{
            return results[0];
        }
    });
};

module.exports.addUser = function (newUser,callback) {
    // console.log(newUser.name,newUser.username,newUser.email);
    bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash(newUser.password,salt,(err,hash) =>{
            sqlcon.connection.query("SELECT * FROM user WHERE email='"+newUser.email.toString()+"'", function (error, results, fields) {
                if (error) throw error;
                // console.log(hash);
                if (results.length>0){
                    console.log("User already in DB");
                }
                else{
                    sqlcon.connection.query("INSERT INTO user VALUES ('"+newUser.name.toString()+"','"+newUser.email.toString()+"','"+hash.toString()+"','"+newUser.username.toString()+"')", function (error, results, fields) {
                        if (error) throw error;
                    });
                }
            });
        });
    });
};