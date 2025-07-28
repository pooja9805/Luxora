import imagekit from "../configs/imageKits.js";
import User from "../models/User.js";
import fs from "fs";
import Car from "../models/Car.js"
import Booking from "../models/Booking.js";

// api to change the role of user
export const changeRoleToOwner = async (req, res)=>{
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// api to list car
export const addCar = async (req, res) => {
  try {
    const {_id} = req.user;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({success: false, message: "Image is required"});
    }

    // Upload image to image kit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/cars'
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {width: '1280'},
        {quality: 'auto'},
        {format: 'webp'}
      ]
    });

    const car = await Car.create({
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      pricePerDay: req.body.pricePerDay,
      category: req.body.category,
      transmission: req.body.transmission,
      fuel_type: req.body.fuel_type,
      seating_capacity: req.body.seating_capacity,
      location: req.body.location,
      description: req.body.description,
      owner: _id,
      image: optimizedImageUrl
    });

    // Clean up the temporary file
    fs.unlinkSync(imageFile.path);

    res.json({success: true, message: "Car added successfully", car});
  } catch (error) {
    console.log(error.message);
    if (req.file?.path) {
      fs.unlinkSync(req.file.path); // Clean up if error occurs
    }
    res.status(500).json({success: false, message: error.message});
  }
}
// API to list owner's cars
export const getOwnerCars = async (req, res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// api to toggle car availability
export const toggleCarAvailability = async (req, res) => {
     try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // check if car belongs to owner
        if(car.owner.toString() !== _id.toString()) {
            return res.json({success: false, message: "You are not authorized to change this car's availability"})
        }
        car.isAvailable = !car.isAvailable;
        await car.save();

        res.json({success: true, message: "Car availability toggled successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to delete a car
export const deleteCar = async (req, res) => {
     try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // check if car belongs to owner
        if(car.owner.toString() !== _id.toString()) {
            return res.json({success: false, message: "You are not authorized to change this car's availability"})
        }
        car.owner = null; // remove owner
        car.isAvailable = false; // set availability to false
        await car.save();

        res.json({success: true, message: "car deleted successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get dashboard data for owner
export const getOwnerDashboardData = async (req, res) => {
    try {
        const {_id, role} = req.user;
        if(role !== "owner") {
            return res.json({success: false, message: "You are not authorized to access this data"})
        }
        const cars = await Car.find({owner: _id});
        const bookings = await Booking.find({owner: _id}).populate('car user').select("-user.password").sort({createdAt: -1});

        const pendingBookings = await Booking.find({owner: _id, status: 'pending'})
        const completedBookings = await Booking.find({owner: _id, status: 'confirmed'})

        // calculate montly revenue from bookings where status is confirmed 
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking)=> acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3), // last 5 bookings
            monthlyRevenue
        }
        res.json({success: true, dashboardData});
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// api to update user image
export const updateUserImage = async (req, res)=>{
    try {
        const {_id} = req.user;
        // upload image to image kit
        const imageFile = req.file;
        // upload image to image kit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // optimize thorugh imagekit and url transformation
        var optimizedImageUrl = imagekit.url({
    path : response.filePath,
    transformation : [
        {width: '400'}, //width resizing
        {quality: 'auto'}, //auto compression
        {format: 'webp'}  //convert to modern format
    ]
});

        const image = optimizedImageUrl;
        
        await User.findByIdAndUpdate(_id, {image});
        res.json({success: true, message: "Image updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

