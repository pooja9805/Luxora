import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

const checkAvailability = async (car, pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    // Validate dates
    if (isNaN(pickup.getTime())) throw new Error("Invalid pickup date");
    if (isNaN(returnD.getTime())) throw new Error("Invalid return date");
    if (pickup >= returnD) throw new Error("Return date must be after pickup date");

    const now = new Date();
    if (pickup < now || returnD < now) {
        throw new Error("Dates must be in the future");
    }

    const bookings = await Booking.find({
        car,
        $or: [
            { 
                pickupDate: { $lte: returnD },
                returnDate: { $gte: pickup }
            },
            {
                pickupDate: { $gte: pickup, $lte: returnD }
            },
            {
                returnDate: { $gte: pickup, $lte: returnD }
            }
        ]
    });
    
    return bookings.length === 0;
};

export const checkCarAvailability = async (req, res) => {
    try {
       const { carId, pickupDate, returnDate } = req.method === 'POST' ? req.body : req.query;
       
       if (!carId || !pickupDate || !returnDate) {
           return res.status(400).json({ 
               success: false, 
               message: "carId, pickupDate, and returnDate parameters are required" 
           });
       }

       const pickup = new Date(pickupDate);
       const returnD = new Date(returnDate);
       
       if (isNaN(pickup.getTime()) || isNaN(returnD.getTime())) {
           return res.status(400).json({
               success: false,
               message: "Invalid date format"
           });
       }
       
       if (pickup >= returnD) {
           return res.status(400).json({
               success: false,
               message: "Return date must be after pickup date"
           });
       }

       const now = new Date();
       if (pickup < now || returnD < now) {
           return res.status(400).json({
               success: false,
               message: "Dates must be in the future"
           });
       }

       const isAvailable = await checkAvailability(carId, pickup, returnD);
       
       res.json({ 
           success: true, 
           available: isAvailable,
           message: isAvailable ? "Car is available" : "Car is not available"
       });

    } catch (error) {
        console.error('Availability check error:', error);
        res.status(500).json({
            success: false, 
            message: error.message || "Internal server error"
        });
    }
};

export const createBooking = async (req, res) => {
    try {
        const {_id} = req.user;
        const {car, pickupDate, returnDate, totalPrice} = req.body;

        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        
        if (isNaN(pickup.getTime())) throw new Error("Invalid pickup date");
        if (isNaN(returnD.getTime())) throw new Error("Invalid return date");
        if (pickup >= returnD) throw new Error("Return date must be after pickup date");

        const now = new Date();
        if (pickup < now || returnD < now) {
            throw new Error("Dates must be in the future");
        }

        const isAvailable = await checkAvailability(car, pickup, returnD);
        if (!isAvailable) {
            return res.status(400).json({success: false, message: "Car is not available for the selected dates"});
        }

        const carData = await Car.findById(car);
        
        const booking = await Booking.create({
            car,
            user: _id,
            owner: carData.owner,
            pickupDate: pickup,
            returnDate: returnD,
            price: totalPrice,
            status: 'confirmed'
        });

        res.json({success: true, message: "Booking created successfully", booking});

    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate('car').sort({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({success: false, message: error.message});
    }
};

export const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role !== 'owner') {
            return res.status(403).json({success: false, message: "Unauthorized access"});
        }
        const bookings = await Booking.find({owner: req.user._id})
            .populate('car user')
            .select("-user.password")
            .sort({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error) {
        console.error('Get owner bookings error:', error);
        res.status(500).json({success: false, message: error.message});
    }
};   

export const changeBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body;
        const booking = await Booking.findById(bookingId);

        if(!booking) {
            return res.status(404).json({success: false, message: "Booking not found"});
        }

        if(booking.owner.toString() !== _id.toString()) {
            return res.status(403).json({success: false, message: "Unauthorized action"});
        }

        booking.status = status;
        await booking.save();

        res.json({success: true, message: "Booking status updated", booking});
    } catch (error) {
        console.error('Status change error:', error);
        res.status(500).json({success: false, message: error.message});
    }
};