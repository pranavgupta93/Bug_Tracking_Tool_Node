const mongoose=require('mongoose');
const authModel=mongoose.model('AuthModel');
const token = require('./../libs/tokenLib');
const responseGenerator = require('./../libs/responseLib');

let isAuthorized=(req,res,next)=>{

    if(req.header('authToken')){
        authModel.findOne({authToken:req.header('authToken')},(err,authDetails)=>{
            if(err){
                console.log(err);
            }
            else if(authDetails==''||authDetails==null){
                let response = responseGenerator.generate('Token has been expired or not valid','Failed to Authorize',401, null);
                res.send(response);
            }
            else{
                token.verifyToken(authDetails.authToken,authDetails.tokenSecret,(err,decoded)=>{
                    if(err){
                        console.log("failed to auth")
                    }
                    else{
                        req.user={userId:decoded.data.userId}
                        next();
                    }
                })
            }
        })
    }
    else{
        let response = responseGenerator.generate('auth token missing in request','Failed to Authorize',401, null);
        res.send(response);
    }
}
module.exports={
    isAuthorized:isAuthorized
}