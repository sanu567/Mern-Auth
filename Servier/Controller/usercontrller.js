import UserModel from "../Model/model.js";

export const getUserData = async (req, resp) => {
    try {
        const userId = req.user._id;  // <-- also fixed this line
        const user = await UserModel.findById(userId);

        if (!user) {
            return resp.json({ success: false, message: "User not found" });
        }

        return resp.json({
            success: true,
            userData: {
                name: user.name,
                isAccountverify: user.isAccountverify
            }
        });

    } catch (error) {
        return resp.json({ success: false, message: error.message });
    }
}
