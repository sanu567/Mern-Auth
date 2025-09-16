import UserModel from "../Model/model.js";
import bcrypt, { truncates } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from "../Confilg/nodemail.js";


export const Register = async (req,resp)=>{
    const{name,email,password}=req.body;

    if(!name || !email || !password){
        return resp.json({success:false,message:'missing user'})
    }
    try{
        const ExitingUser = await UserModel.findOne({email})
        if(ExitingUser){
            return resp.json({success:false,message:'user Already'});
        }
        const hashpassword = await bcrypt.hash(password,10);
        const user = new UserModel({name,email,password:hashpassword});
        await user.save();
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        resp.cookie('token',token, {
           httpOnly: true,
          secure: true,       
          sameSite: 'None',   
           maxAge: 7 * 24 * 60 * 60 * 1000
        });
        //sending email to the user
        const mailSend ={
            from:process.env.SMTP_EMAIL,
            to:email,
            subject:"welcome to webkit",
            text:`welcome to webkit website,your account has been created with email id:${email}`
        }
        await transporter.sendMail(mailSend);

        return resp.json({success:true,message:'user is create'});
  
    }catch (error){
        resp.json({success:false,message:error.message})
    }
    
};
export const login = async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return resp.json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return resp.json({ success: false, message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.json({ success: false, message: 'Wrong password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    resp.cookie('token', token, {
        httpOnly: true,
          secure: true,       
          sameSite: 'None',   
           maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return resp.json({ success: true });

  } catch (error) {
    return resp.json({ success: false, message: error.message });
  }
};

export const logout = async (req,resp)=>{
    try{
          resp.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production'?'none':'strict',
        })

        return resp.json({success:true,message:"logout"})
        
    }catch(error){
         resp.json({success:false,message:error.message})
    }
}
// send otp for verification
export const sendOtp = async (req, resp) => {
  try {
    const userId= req.user.id;
    const user= await UserModel.findById(userId)
    if(user.isAccountverify){
      return resp.json({success:false, message:"Account already verified"})
    }
    const otp= String(Math.floor(10000+Math.random()*900000));
   user.verifyotp=otp;
    user.verifyotpExire=Date.now()+24*60*60*1000;
    await user.save();

     const mailSend={
      from:process.env.SMTP_EMAIL,
      to:user.email,
      subject:"Account veificaton OTP",
      text:`your OTP is ${otp}.Verify your account using this OTP`
     }
 
     await transporter.sendMail(mailSend);
     resp.json({success:true,message:"OTP is send to your mail"})

  }
  catch(error) {
    resp.json({success:false, message: error.message})
  }
};

// verified the account
export const verifyEmail= async(req,resp)=>{
  const {otp}= req.body;
  if(!otp){
    return resp.json({success:false, message:"missing email or otp"})
  }
  try{
    const user = req.user;
    if(!user){
     return resp.json({success:false, message:"user not found"})
    }
    if(user.verifyotp==='' || user.verifyotp!==otp){
     return resp.json({success:false, message:"invalid otp"})
    }
    if(user.verifyotpExire<Date.now()){
      return resp.json({success:false, message:"otp is expire"})
    }
    user.isAccountverify=true;
    user.verifyotp='';
    user.verifyotpExire=0;
    await user.save();
    return resp.json({success:true, message:"Email is verified"})

  }
  catch(error){
    return resp.json({success:false, message:error.message})
  }
};

//check isAuthenticated or not 
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//send password reset otp
export const sendRestOtp= async(req,resp)=>{
  const {email}=req.body;
  
  if(!email){
    return resp.json({success:false,message:"Email is required"})
  }
  try {
    const user=await UserModel.findOne({email});
    if(!user){
      return resp.json({success:false,message:"Email is not found"})
    }
    const RestOtp=String(Math.floor(1000+Math.random()*900000));
    user.resetotp=RestOtp;
    user.resetotpExp=Date.now() + 1 * 60 * 1000 ;
    await user.save();

    const mailSend ={
      from:process.env.SMTP_EMAIL,
      to:user.email,
      subject:"Password reset otp",
      text:`your reset password otp is ${RestOtp}`
    }
    
    await transporter.sendMail(mailSend);
    return resp.json({success:true,message:"OTP is send"});

  } catch (error) {
   return resp.json({success:false,message:"error.message"})
  }
};

//restpassword
export const resetpassword = async(req,resp)=>{
  const{email,otp,newpassword}=req.body;
  if(!email||!otp||!newpassword){
    return resp.json({success:false,message:"Email or otp or password is required"});
  }
  try {
    const user=await UserModel.findOne({email});
    if(!user){
      return resp.json({success:false,message:"user not found"});
    }
    if(user.resetotp!=otp || user.resetotp===''){
      return resp.json({success:false,message:"wrong OTP"});
    }
    if(user.resetotpExp<Date.now()){
      return resp.json({success:false,message:"OTP is Expired"})
    }
    const hashpassword = await bcrypt.hash(newpassword,10);

    user.password=hashpassword;
    user.resetotp='';
    user.resetotpExp=0;
    await user.save();
    return resp.json({success:true,message:"password is reset"});

  } catch (error) {
    return resp.json({success:false,message:"error.message"});
  }
}
