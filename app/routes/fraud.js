// fraud.js in /app/routes/

var express = require('express');
var router = express.Router();

// Middlewares
var middlewares = require("../middleware/middlewares");

// require the model JS files
var Email = require('../models/email');
var User = require('../models/user');

// middleware specific to this router
router.all("*", middlewares.timeLog);
router.put("*", middlewares.authorize);


// Define the email route

router.route('/:email_id/:auth')

.get(function(req, res) {
    Email.findById(req.params.email_id, function(err, email) {
        if (err) {
            res.send(err);
        }
        else {
            User.findById(email.userId, function(err, user) {
                if (err) {
                    res.send(err);
                }
                else {
                    if (req.params.auth === user.authKey){
                        email.confirmed = 400; // 100: not confirmed, 200: request sent, 300: confirmed, 400: fraudulent email
                        email.save(function(err, email) {
                            if (err) {
                                res.send(err);
                            }
                            else {
                                res.json({
                                    message: "Marked for deletion: " + email.replyTo
                                });
                                console.log('Fraudulent access: ' + user.ip);
                            }
                        });
                    }
                    else {
                        res.json(401, { message: "Invalid key provided, not authorized" });
                    }
                }
            });
        }
    });
});

/*
.delete(function(req, res) {
    
    Email.findById(req.params.email_id, function(err, email) {
        if (err) {
            res.send(err);
        }
        else {
            User.findById(email.userId, function(err, user) {
                if (err) {
                    res.send(err);
                }
                else {
                    if (req.params.auth === user.authKey){
                        email.remove(function(err, email) {
                            if (err) {
                                res.send(err);
                            }
                            else {
                                res.json({
                                    message: "Email Deleted " + email._id
                                });
                                console.log('Email Deleted: ' + email._id);
                            }
                        });
                    }
                }
            });
        }
    });
});
*/

module.exports = router;