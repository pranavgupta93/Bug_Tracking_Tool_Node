const mongoose = require('mongoose');
const shortid = require('shortid');
const token = require('../libs/tokenLib')
const UserModel = mongoose.model('User');
const Auth = mongoose.model('AuthModel');
const hashPassword = require('../libs/generatePasswordLib');
const responseGenerator = require('../libs/responseLib');
const nodemailer = require('nodemailer');
const appconfig = require('../../config/appConfig');
/**
 * Fetches all users from database.
 *
 * @author Pranav Gupta <pranavgupta93@gmail.com>
 * @param {object} req the request parameter containing headers and url/body parameters.
 * @param {object} res the response parameter for sending response to the client.
 * @return {Array} The array of all users.
 */
let getAllUsers = (req, res) => {
    UserModel.find().select('fullName userId -_id').lean()
        .exec((err, result) => {
            if (err) {
                let response = responseGenerator.generate(err, 'Database Error', 503, null);
                res.send(response);
            }
            else {

                let response = responseGenerator.generate(null, 'Success', 200, result);
                res.send(response);
            }
        });
}

/**
 * Fetches single user from database.
 *
 * @author Pranav Gupta <pranavgupta93@gmail.com>
 * @param {object} req the request parameter containing headers and url/body parameters.
 * @param {object} res the response parameter for sending response to the client.
 * @return {object} The object of user details.
 */
let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.id })
        .exec((err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        })
}

/**
 * Registers new User
 *
 * @author Pranav Gupta <pranavgupta93@gmail.com>
 * @param {object} req the request parameter containing headers and url/body parameters.
 * @param {object} res the response parameter for sending response to the client.
 * @return {object} The object of user details.
 */
let signUp = (req, res) => {
    // console.log("inside signup");
    let validateUserInput = () => {
        // console.log("vlidate user");
        return new Promise((resolve, reject) => {
            // console.log("vlidate user2");
            if (req.body.email == null) {
                // console.log("inv ip")
                reject("Invalid input");
            }
            else {
                // console.log("vlidate user3");
                resolve(req);
            }
        })
    }

    let createUser = () => {
        // console.log("create user");
        //// console.log(req);
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, result) => {
                    if (err) {
                        // console.log("err")
                        reject("error occured");
                    }
                    else if (result == null || result == '') {
                        // console.log("new user")
                        let newuser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            fullName: req.body.firstName + ' ' + req.body.lastName,
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: hashPassword.hashPassword(req.body.password),
                            createdOn: Date.now()
                        });
                        newuser.save((err, result) => {
                            if (err) {
                                // console.log("failed to create user")
                            }
                            else {
                                // console.log("new user saved")
                                let newuserobj = result.toObject();
                                resolve(newuserobj);
                            }
                        })
                    }

                    else {
                        // console.log("user already exist");
                        reject("user already exist");
                    }
                })
        })
    }

    validateUserInput(req, res)
        .then(createUser)
        .then((result) => {
            // console.log("got result")
            let response = responseGenerator.generate(null, 'Successfully Registered', 200, result);
            res.send(response);
        })
        .catch(err => {
            let response = responseGenerator.generate(err, 'Failed To Register', 403, null);
            res.status(403).send(response);
        });
}


/**
 * User Login
 *
 * @author Pranav Gupta <pranavgupta93@gmail.com>
 * @param {object} req the request parameter containing headers and url/body parameters.
 * @param {object} res the response parameter for sending response to the client.
 * @return {object} The object of user details and auth Token.
 */
let logIn = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email == '' || req.body.password == '' || req.body.email == undefined || req.body.password == undefined) {
                reject("Email or password should not be blank")
            }
            else {
                resolve(req);
            }
        })
    }
    let findUserAndLogin = () => {

        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, result) => {
                    if (err) {
                        reject("Internal err")
                    }
                    else if (result == '' || result == null) {
                        reject("User not regsitered");
                    }
                    else {
                        hashPassword.comparePassword(req.body.password, result.password, (err, match) => {
                            if (err) {
                                reject(err);
                            }
                            else if (match) {
                                resolve(result);
                            }
                            else {
                                reject("Incorrect password");
                            }
                        })
                    }
                })
        })
    }

    let generateToken = (userDetails) => {
        // console.log("generate token")
        return new Promise((resolve, reject) => {
            // console.log("befor generate token lib fun call")
            token.generateToken(userDetails, (err, tokenDetails) => {
                //// console.log(userDetails);
                if (err) {
                    //// console.log(err)
                    reject(err);
                }
                else {
                    // console.log("else generate token")
                    tokenDetails.userId = userDetails.userId;
                    tokenDetails.userDetails = userDetails;
                    resolve(tokenDetails);
                }
            })
        })
    }
    let saveToken = (token1) => {
        return new Promise((resolve, reject) => {
            Auth.findOne({ userId: token1.userId })
                .exec((err, result) => {
                    if (err) {
                        reject(err)
                    }
                    else if (result == '' || result == null) {
                        let newAuth = new Auth({
                            userId: token1.userId,
                            authToken: token1.token,
                            tokenSecret: token1.tokenSecret,
                            tokenGenerationTime: Date.now()
                        });
                        newAuth.save((err, newToken) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                // console.log('line 185');
                                // console.log(token1);
                                let response = {
                                    authToken: newToken.authToken,
                                    userId: newToken.userId,
                                    fullName: token1.userDetails.fullName,
                                    resetPassword: token1.userDetails.resetPassword
                                }
                                resolve(response);
                            }
                        })
                        // console.log('else if save token')
                    }
                    else {
                        // console.log('else save token');
                       // console.log// console.log(token1);
                        result.authToken = token1.token;
                        result.tokenSecret = token1.tokenSecret
                      // console.log result.fullName = token1.userDetails.fullName;
                        // console.log result.tokenSecret=token1.tokenSecret;
                        result.tokenGenerationTime = Date.now();
                        result.save((err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                let response = result.toObject();
                                delete response.__v;
                                delete response._id;
                                delete response.tokenSecret;
                                response.fullName = token1.userDetails.fullName;
                                // console.log("line 210");

                            // console.log(response);
                                resolve(response);
                            }
                        })
                    }
                })
        })
    }

    validateUserInput(req, res)
        .then(findUserAndLogin)
        .then(generateToken)
        .then(saveToken)
        .then((result) => {
            let response = responseGenerator.generate(null, 'Login Success', 200, result);
            res.send(response);
        })
        .catch((err) => {
            let response = responseGenerator.generate(err, 'Unable to Authorize', 401, null);
            res.send(response);
        }
        );
}

/**
 * Logs out the user
 *
 * @author Pranav Gupta <pranavgupta93@gmail.com>
 * @param {object} req the request parameter containing headers and url/body parameters.
 * @param {object} res the response parameter for sending response to the client.
 * @return {object} The object containing success message of successful logout.
 */
let logout = (req, res) => {
    Auth.findOneAndRemove({ userId: req.body.userId }, (err, authModelResult) => {
        if (err) {
            let response = responseGenerator.generate(err, 'Internal Error', 401, null);
            res.send(response)
        }
        else if (authModelResult == '' || authModelResult == null) {
            let response = responseGenerator.generate(null, 'Already logged out', 200, null);
            res.send(response);
        }
        else {
            let response = responseGenerator.generate(null, 'logged out', 200, null);
            res.send(response);
        }
    })
}

let forgotPassword = (req, res) => {
     let newPassword = hashPassword.generateRandomPassword();
     let newHashPassword = hashPassword.hashPassword(newPassword);
    let validateEmail = () => {
        return new Promise((resolve,reject)=>{
            UserModel.findOne({email: req.body.email},(err, result)=>{
                if(err){
                    reject('DB error');
                    
                }
                else if (result === null || result === undefined)
                {
                    reject('User Not Found');
                }
                else {
                   // console.log(result);
                    resolve(result);
                }
            })
        })
    }
    let updateExistingPassword =(result) => {
        return new Promise((resolve,reject) => {
            result.password = newHashPassword;
            result.resetPassword = true;
            console.log(result);
            result.save((err, result)=>{
                if(err){
                    console.log('DB err');
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        })
    }
    let sendPasswordRecoveryMail = (result) =>{
       return new Promise((resolve,reject)=>{
        var mailOptions = {
            from: '"Password Recovery" <pranavprojects1@gmail.com>',
            to: req.body.email,
            subject: 'Password Recovery ',
            html: 'Dear '+ result.firstName +',' + '<br></br> Please use password '+ newPassword + ' for login into the application. Please change your password once you login.' + '<br></br> NOTE: This is an auto generated mail.'
        };
       
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: appconfig.mail.user,
                   pass: appconfig.mail.pass
               }
           });

           transporter.sendMail(mailOptions, (err, info)=>{
               if(err){
                   reject(err);
               }
               else{
                   resolve(info);
               }
           })
       })
    }
    validateEmail(req,res)
    .then(updateExistingPassword)
    .then(sendPasswordRecoveryMail)
    .then((result) => {
        let response = responseGenerator.generate(null,'Success',200,result);
        res.send(response);
        console.log(res);
    }).catch((err) => {
        let response = responseGenerator.generate(err,'Error Occured', 503, null);
        res.send(response);
        console.log(err);
    })
    
    
}

let changePassword = (req, res) => {
    let validateExistingPassword = () => {
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId : req.body.userId},(err, result) => {
                if(err) {
                    reject('DB error');
                }
                else {
                 hashPassword.comparePassword(req.body.password, result.password, (err,match) => {
                     if(err){
                         reject('DB Password');
                     }
                     else if(match) {
                         console.log(result);
                         result.password = hashPassword.hashPassword(req.body.newPassword);
                         result.resetPassword = false;
                         result.save((err, result) => {
                             if(err){
                                 reject('Incorrect Password');
                             }
                             else{
                                 resolve('Password updated');
                             }
                         })
                     }
                     else {
                        reject('Incorrect Password');
                         
                     }
                 })
                }
             });
        })
    }
    validateExistingPassword(req,res).then(result => {
        let response = responseGenerator.generate(null, result, 200, null);
        res.send(response);
    })
    .catch(err => {
        let response = responseGenerator.generate(null, err, 503, null);
        res.send(response);
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    signUp: signUp,
    logIn: logIn,
    logout: logout,
    forgotPassword: forgotPassword,
    changePassword: changePassword
}