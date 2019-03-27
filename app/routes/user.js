const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth=require('../middleware/auth')
module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/users`;
    app.get(`${baseUrl}/all`,auth.isAuthorized,userController.getAllUsers);
    /**
	 * @api {get} /api/v1/users/all Get all users
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
                [    {
                        userId: "string",
                        fullName: "string"
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
 //   app.get(`${baseUrl}/user/:id`,auth.isAuthorized,userController.getSingleUser);
    app.post(`${baseUrl}/signup`,userController.signUp);
    /**
	 * @api {post} /api/v1/users/signup Register New User
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Success",
	    "status": 200,
	    "data": 
                [    {
                        createdOn: "date"
                        email: "string"
                        firstName: "string"
                        fullName: "string"
                        lastName: "string"
                        mobileNumber: "string"
                        userId: "string"
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
    app.post(`${baseUrl}/login`,userController.logIn);
    /**
	 * @api {post} /api/v1/users/login User Login
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Success",
	    "status": 200,
	    "data": 
                [    {
                        authToken: "string"
                        fullName: "string"
                        userId: "string"
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
    app.post(`${baseUrl}/logout`,userController.logout);
    /**
	 * @api {post} /api/v1/users/logout Logs out current signed in user and delete enteries in auth model
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": null,
	    "message": "Logged Out",
	    "status": 200,
	    "data": null
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