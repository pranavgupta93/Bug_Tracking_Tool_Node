define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/bugs/create",
    "title": "Create New Issue",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": \n                {\n                    assignee: \"string\"\n                    assigneeId: \"string\"\n                    bugDesc: \"string\"\n                    bugId: \"string\"\n                    bugStatus: \"string\"\n                    bugTitle: \"string\"\n                    comments: object(type = array)\n                    createdOn: \"date\"\n                    modifiedOn: \"date\"\n                    reporter: \"string\"\n                    reporterId: \"string\"\n                    watchers: string(type = array)\n                }\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/bugs.js",
    "groupTitle": "create",
    "name": "PostApiV1BugsCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "User Login",
    "version": "0.0.1",
    "group": "create",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": \n                [    {\n                        authToken: \"string\"\n                        fullName: \"string\"\n                        userId: \"string\"\n                    }\n                ]\n\t    \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Register New User",
    "version": "0.0.1",
    "group": "create",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": \n                [    {\n                        createdOn: \"date\"\n                        email: \"string\"\n                        firstName: \"string\"\n                        fullName: \"string\"\n                        lastName: \"string\"\n                        mobileNumber: \"string\"\n                        userId: \"string\"\n                    }\n                ]\n\t    \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersSignup"
  },
  {
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "Logs out current signed in user and delete enteries in auth model",
    "version": "0.0.1",
    "group": "delete",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Logged Out\",\n\t    \"status\": 200,\n\t    \"data\": null\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "delete",
    "name": "PostApiV1UsersLogout"
  },
  {
    "type": "put",
    "url": "/api/v1/bugs/:bugId",
    "title": "Edit details of the issue",
    "version": "0.0.1",
    "group": "edit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bugId",
            "description": "<p>The bugId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": \n                {\n                    assignee: \"string\"\n                    assigneeId: \"string\"\n                    bugDesc: \"string\"\n                    bugId: \"string\"\n                    bugStatus: \"string\"\n                    bugTitle: \"string\"\n                    comments: object(type = array)\n                    createdOn: \"date\"\n                    modifiedOn: \"date\"\n                    reporter: \"string\"\n                    reporterId: \"string\"\n                    watchers: string(type = array)\n                }\n\t    \t\t\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/bugs.js",
    "groupTitle": "edit",
    "name": "PutApiV1BugsBugid"
  },
  {
    "type": "get",
    "url": "/api/v1/bugs/:bugId",
    "title": "Get full description of the issue",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bugId",
            "description": "<p>The bugId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": \n                {\n                    assignee: \"string\"\n                    assigneeId: \"string\"\n                    bugDesc: \"string\"\n                    bugId: \"string\"\n                    bugStatus: \"string\"\n                    bugTitle: \"string\"\n                    comments: object(type = array)\n                    createdOn: \"date\"\n                    modifiedOn: \"date\"\n                    reporter: \"string\"\n                    reporterId: \"string\"\n                    watchers: string(type = array)\n                }\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/bugs.js",
    "groupTitle": "read",
    "name": "GetApiV1BugsBugid"
  },
  {
    "type": "get",
    "url": "/api/v1/bugs/:userId",
    "title": "Get all Issues assigned to user",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": [\n                    {\n                        assignee: \"string\"\n                        assigneeId: \"string\"\n                        bugDesc: \"string\"\n                        bugId: \"string\"\n                        bugStatus: \"string\"\n                        bugTitle: \"string\"\n                        comments: object(type = array)\n                        createdOn: \"date\"\n                        modifiedOn: \"date\"\n                        reporter: \"string\"\n                        reporterId: \"string\"\n                        watchers: string(type = array)\n                    }\n\t    \t\t]\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/bugs.js",
    "groupTitle": "read",
    "name": "GetApiV1BugsUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/users/all",
    "title": "Get all users",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": \n                [    {\n                        userId: \"string\",\n                        fullName: \"string\"\n                    }\n                ]\n\t    \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "read",
    "name": "GetApiV1UsersAll"
  },
  {
    "type": "put",
    "url": "/api/v1/bugs/search",
    "title": "Get all issues based on search text",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": null,\n\t    \"message\": \"Success\",\n\t    \"status\": 200,\n\t    \"data\": \n                [    \n                    {\n                        assignee: \"string\"\n                        assigneeId: \"string\"\n                        bugDesc: \"string\"\n                        bugId: \"string\"\n                        bugStatus: \"string\"\n                        bugTitle: \"string\"\n                        comments: object(type = array)\n                        createdOn: \"date\"\n                        modifiedOn: \"date\"\n                        reporter: \"string\"\n                        reporterId: \"string\"\n                        watchers: string(type = array)\n                    }\n                ]\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": object,\n\t    \"message\": \"Internal error\",\n\t    \"status\": 503,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/bugs.js",
    "groupTitle": "read",
    "name": "PutApiV1BugsSearch"
  }
] });
