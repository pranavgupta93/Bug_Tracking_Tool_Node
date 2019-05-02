const mongoose=require('mongoose');
let Schema= mongoose.Schema;
let userSchema= new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
      },
      firstName: {
        type: String,
        default: ''
      },
      lastName: {
        type: String,
        default: ''
      },
      fullName: {
        type: String,
        default : ''
      },
      password: {
        type: String,
        default: 'passskdajakdjkadsj'
      },
      email: {
        type: String,
        default: ''
      },
      mobileNumber: {
        type: String,
        default: ''
      },
      createdOn :{
        type:Date,
        default:""
      },
      resetPassword :{
        type: Boolean,
        default: false
      }
});

mongoose.model('User',userSchema);