
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    verifyotp:{type:String,default:""},
    verifyotpExire:{type:Number,default:0},
    isAccountverify:{type:Boolean,default:false},
    resetotp:{type:String,default:""},
    resetotpExp:{type:Number,default:0},
}
)
const UserModel =mongoose.model.user|| mongoose.model('user',UserSchema);
export default UserModel;