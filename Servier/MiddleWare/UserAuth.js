import jwt from 'jsonwebtoken';
import UserModel from "../Model/model.js";


const UserAuth = async (req, resp,next)=>{
    try {
    const token = req.cookies.token;

    if (!token) {
      return resp.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return resp.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    // Fetch user from DB
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return resp.status(401).json({ success: false, message: "User not found, login again" });
    }

    req.user = user;  // Attach the full user object to req.user
    next();
  } catch (error) {
        return resp.json({success:false, message:error.message})
    }
}
export default UserAuth;