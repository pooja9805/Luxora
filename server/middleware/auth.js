import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // safely extract token

    if (!token) {
        return res.json({ success: false, message: "not authorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.userId;

        if (!userId) {
            return res.json({ success: false, message: "not authorized" });
        }

        req.user = await User.findById(userId).select("-password");
        next();
    } catch (error) {
        return res.json({ success: false, message: "not authorized" });
    }
};
