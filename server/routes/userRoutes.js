import express from "express"
import {  getCars, getUserData, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
// import { changeRoleToOwner } from "../controllers/ownerController.js";

const userRoutes = express.Router();

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/data', protect, getUserData)
userRoutes.get('/cars', getCars) // Assuming this is to fetch user cars
// userRoutes.post('/change-role', protect, changeUserRole)
export default userRoutes