const express = require('express');
const router = express.Router();
const bugController = require("./../../app/controllers/bugController");
const appConfig = require("./../../config/appConfig")
const auth=require('../middleware/auth')
module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/bugs`;
    
    app.get(`${baseUrl}/assigned/:userId`,auth.isAuthorized,bugController.getIssuesAssignedToUser);
    /**
	 * @api {get} /api/v1/bugs/:userId Get all Issues assigned to user
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as a header)
     * @apiParam {String} userId The userId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Success",
	    "status": 200,
	    "data": [
                    {
                        assignee: "string"
                        assigneeId: "string"
                        bugDesc: "string"
                        bugId: "string"
                        bugStatus: "string"
                        bugTitle: "string"
                        comments: object(type = array)
                        createdOn: "date"
                        modifiedOn: "date"
                        reporter: "string"
                        reporterId: "string"
                        watchers: string(type = array)
                    }
	    		]
	    }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": object,
	    "message": "Internal error",
	    "status": 503,
	    "data": null
	   }
	 */
    app.get(`${baseUrl}/:bugId`,auth.isAuthorized,bugController.getIssuesDesc);
    /**
	 * @api {get} /api/v1/bugs/:bugId Get full description of the issue
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as a header)
     * @apiParam {String} bugId The bugId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Success",
	    "status": 200,
	    "data": 
                {
                    assignee: "string"
                    assigneeId: "string"
                    bugDesc: "string"
                    bugId: "string"
                    bugStatus: "string"
                    bugTitle: "string"
                    comments: object(type = array)
                    createdOn: "date"
                    modifiedOn: "date"
                    reporter: "string"
                    reporterId: "string"
                    watchers: string(type = array)
                }
	    }

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": object,
	    "message": "Internal error",
	    "status": 503,
	    "data": null
	   }
	 */
    app.put(`${baseUrl}/:bugId`,auth.isAuthorized,bugController.updateIssueDesc);
    /**
	 * @api {put} /api/v1/bugs/:bugId Edit details of the issue
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as a header)
     * @apiParam {String} bugId The bugId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Success",
	    "status": 200,
	    "data": 
                {
                    assignee: "string"
                    assigneeId: "string"
                    bugDesc: "string"
                    bugId: "string"
                    bugStatus: "string"
                    bugTitle: "string"
                    comments: object(type = array)
                    createdOn: "date"
                    modifiedOn: "date"
                    reporter: "string"
                    reporterId: "string"
                    watchers: string(type = array)
                }
	    		
	    }

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": object,
	    "message": "Internal error",
	    "status": 503,
	    "data": null
	   }
	 */
    app.post(`${baseUrl}/create`,bugController.createIssue);
    /**
	 * @api {post} /api/v1/bugs/create Create New Issue
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Success",
	    "status": 200,
	    "data": 
                {
                    assignee: "string"
                    assigneeId: "string"
                    bugDesc: "string"
                    bugId: "string"
                    bugStatus: "string"
                    bugTitle: "string"
                    comments: object(type = array)
                    createdOn: "date"
                    modifiedOn: "date"
                    reporter: "string"
                    reporterId: "string"
                    watchers: string(type = array)
                }
	    }

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": object,
	    "message": "Internal error",
	    "status": 503,
	    "data": null
	   }
	 */
    app.post(`${baseUrl}/search`,auth.isAuthorized,bugController.searchIssues);
    /**
	 * @api {put} /api/v1/bugs/search Get all issues based on search text
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Success",
	    "status": 200,
	    "data": 
                [    
                    {
                        assignee: "string"
                        assigneeId: "string"
                        bugDesc: "string"
                        bugId: "string"
                        bugStatus: "string"
                        bugTitle: "string"
                        comments: object(type = array)
                        createdOn: "date"
                        modifiedOn: "date"
                        reporter: "string"
                        reporterId: "string"
                        watchers: string(type = array)
                    }
                ]
	    }

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": object,
	    "message": "Internal error",
	    "status": 503,
	    "data": null
	   }
	 */
}