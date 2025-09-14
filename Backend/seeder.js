// backend/seeder.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config(); // loads .env variables

const seedAdmin = async () => {
  try {
    // connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");

    // clear old admins (optional)
    await Admin.deleteMany();

    // hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // insert default admin
    await Admin.create({
      username: "admin",
      passwordHash: hashedPassword,
    });

    console.log("✅ Admin seeded successfully with username: admin, password: admin123");
    process.exit(); // exit script
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
