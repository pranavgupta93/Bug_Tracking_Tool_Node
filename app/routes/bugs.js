const express = require('express');
const router = express.Router();
const bugController = require("./../../app/controllers/bugController");
const appConfig = require("./../../config/appConfig")
const auth=require('../middleware/auth')
module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/bugs`;
    app.get("/",function(req,res){
        res.send("hello")
    });
    app.post(`${baseUrl}/create`,bugController.createIssue);
    app.get(`${baseUrl}/assigned/:userId`,bugController.getIssuesAssignedToUser);
    app.get(`${baseUrl}/:bugId`,bugController.getIssuesDesc);
    // app.get(`${baseUrl}/all`,auth.isAuthorized,userController.getAllUsers);
    // app.get(`${baseUrl}/user/:id`,auth.isAuthorized,userController.getSingleUser);
    // app.post(`${baseUrl}/signup`,userController.signUp);
    // app.post(`${baseUrl}/login`,userController.logIn);
    // app.post(`${baseUrl}/logout`,auth.isAuthorized,userController.logout);
}