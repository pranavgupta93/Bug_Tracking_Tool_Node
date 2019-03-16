const mongoose=require('mongoose');
let Schema= mongoose.Schema;
let bugSchema = new Schema({
    bugId : {
        type : String,
        default: '',
        unique : true,
        index : true
    },
    bugStatus : {
        type : String,
        default : 'backlog'
    },
    reporter : {
        type : String
    },
    reporterId : {
        type : String
    },
    assignee : {
        type : String
    },
    assigneeId : {
        type : String
    },
    watchers : {
        type : Array
    },
    createdOn : {
        type : Date
    },
    modifiedOn : {
        type : Date
    },
    comments : {
        type : Array
    }
});

mongoose.model('Bug',bugSchema);