const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // connection to database 
        const con = await mongoose.connect("mongodb://127.0.0.1:27017/GoFood", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        }) 

        console.log(`MongoDB connected : ${con.connection.host}`);

        // read data from GoFood database from collection food_items
        const collectionOfItems = await mongoose.connection.db.collection("food_items");
        const foodItems = await collectionOfItems.find({}).toArray();
        global.food_items = foodItems;

        const collectionOfCategory = await mongoose.connection.db.collection("foodCategory");
        const foodCategory = await collectionOfCategory.find({}).toArray();
        global.food_category = foodCategory;
        

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB