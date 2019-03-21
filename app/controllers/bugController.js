const mongoose = require('mongoose');
const shortid = require('shortid');
const token = require('../libs/tokenLib')
const bugModel = mongoose.model('Bug');
const responseGenerator = require('../libs/responseLib');

let createIssue = (req, res) => {
    let tempWatchers = [];
    tempWatchers.push(req.body.reporter);
    if (req.body.assignee && req.body.assignee != req.body.reporter) {
        tempWatchers.push(req.body.assignee);
    }
    let newIssue = new bugModel({
        bugId: shortid.generate(),
        bugTitle: req.body.bugTitle,
        bugDesc: req.body.bugDesc,
        bugStatus: 'Backlog',
        reporter: req.body.reporter,
        reporterId: req.body.reporterId,
        assignee: req.body.assignee,
        assigneeId: req.body.assigneeId,
        createdOn: Date.now(),
        modifiedOn: Date.now(),
        watchers: tempWatchers
    });
    newIssue.save((err, result) => {
        if (err) {
            console.log(err);
            let response = responseGenerator.generate(err, 'Issue Created', 503, null);
            res.send(response);
        }
        else {
            let resultObj = result.toObject();
            delete resultObj._id;
            delete resultObj.__v;
            let response = responseGenerator.generate(null, 'Issue Created', 200, resultObj);
            res.send(response);
        }
    })
}

let getIssuesAssignedToUser = (req, res) => {
    bugModel.find({ 'assigneeId': req.params.userId })
        .select('-_id -__v')
        .lean().exec((err, result) => {
            if (err) {
                let response = responseGenerator.generate(err, 'Database Error', 503, null);
                res.send(response);
            }
            else if (result == '' || result == undefined) {
                let response = responseGenerator.generate(null, 'No issues Assigned to user', 404, result);
                res.send(response);
            }
            else {
                let response = responseGenerator.generate(null, 'Success', 200, result);
                res.send(response);
            }
        })
}

let getIssuesDesc = (req, res) => {
    bugModel.findOne({ 'bugId': req.params.bugId })
        .select('-_id -__v')
        .lean().exec((err, result) => {
            if (err) {
                let response = responseGenerator.generate(err, 'Database Error', 503, null);
                res.send(response);
            }
            else {
                let response = responseGenerator.generate(null, 'Success', 200, result);
                res.send(response);
            }
        })
}

let updateIssueDesc = (req, res) => {
    req.body.modifiedOn = Date.now();
    bugModel.findOneAndUpdate({ bugId: req.params.bugId }, req.body, {new:true},(err, result) => {
        if (err) {
            let response = responseGenerator.generate(err, 'Database Error', 503, null);
            res.send(response);
        }
        else {
            console.log(result);
            let response = responseGenerator.generate(null, 'Success', 200, result);
            res.send(response);
        }
    })
}

let searchIssues = (req,res) => {
    console.log(req.body);
    bugModel.find({$text: { $search: req.body.searchText }},(err, result) => {
        if (err) {
            console.log("err"+err);
            let response = responseGenerator.generate(err, 'Database Error', 503, null);
            res.send(response);
        }
        else {
            console.log("result"+result);
            let response = responseGenerator.generate(null, 'Success', 200, result);
            res.send(response);
        }
    })
}

module.exports = {
    createIssue: createIssue,
    getIssuesAssignedToUser: getIssuesAssignedToUser,
    getIssuesDesc: getIssuesDesc,
    updateIssueDesc: updateIssueDesc,
    searchIssues: searchIssues
}