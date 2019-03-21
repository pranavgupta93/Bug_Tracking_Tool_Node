const mongoose = require('mongoose');
const shortid = require('shortid');
const token = require('../libs/tokenLib')
const UserModel = mongoose.model('User');
const Auth = mongoose.model('AuthModel');
const hashPassword = require('../libs/generatePasswordLib');
const responseGenerator = require('../libs/responseLib');
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
                                    token: newToken.authToken,
                                    userId: newToken.userId,
                                    fullName: token1.userDetails.fullName
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
            res.send(response)
        }
        );
}
let logout = (req, res) => {
    Auth.findOneAndRemove({ userId: req.user.userId }, (err, authModelResult) => {
        if (err) {
            res.send("Internal error");
        }
        else if (authModelResult == '' || authModelResult == null) {
            res.send("Already Logged Out");
        }
        else {
            res.send("Logged out successfully");
        }
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    signUp: signUp,
    logIn: logIn,
    logout: logout
}