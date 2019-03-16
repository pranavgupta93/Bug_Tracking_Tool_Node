const mongoose = require('mongoose');
const shortid = require('shortid');
const token=require('../libs/tokenLib')
const bugModel = mongoose.model('Bug');
const responseGenerator = require('../libs/responseLib');

let createIssue = (req,res) => {
    let tempWatchers = [];
    tempWatchers.push(req.params.reporter);
    if(req.params.assignee){
        tempWatchers.push(req.params.assignee);
    }
    let newIssue = new bugModel({
        bugId : shortid.generate(),
        bugStatus : req.params.bugStatus,
        reporter : req.params.reporter,
        reporterId : req.params.reporterId,
        assignee : req.params.assignee,
        assigneeId : req.params.assigneeId,
        createdOn : Date.now(),
        watchers : tempWatchers
    });
}

module.exports = {
    createIssue : createIssue
}