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
    app.get(`${baseUrl}/assigned/:userId`,auth.isAuthorized,bugController.getIssuesAssignedToUser);
    app.get(`${baseUrl}/:bugId`,auth.isAuthorized,bugController.getIssuesDesc);
    app.put(`${baseUrl}/:bugId`,auth.isAuthorized,bugController.updateIssueDesc);
    app.post(`${baseUrl}/search`,auth.isAuthorized,bugController.searchIssues);
}