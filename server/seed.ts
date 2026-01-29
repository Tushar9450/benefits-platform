import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path'; // Add this built-in module
import { Deal } from './models/Deal';

// Explicitly tell dotenv where to find your .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const deals = [
  {
    title: "AWS Cloud Credits",
    description: "$5,000 in credits for early-stage startups.",
    partnerName: "Amazon Web Services",
    category: "Cloud",
    promoCode: "AWS5KSTART",
    accessLevel: "locked",
    logoUrl: "https://logo.clearbit.com/aws.amazon.com"
  },
  {
    title: "Notion for Startups",
    description: "6 months free of Notion Plus with unlimited AI.",
    partnerName: "Notion",
    category: "Productivity",
    promoCode: "NOTION6FREE",
    accessLevel: "public",
    logoUrl: "https://logo.clearbit.com/notion.so"
  }
];

const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error("MONGODB_URI is undefined. Check your .env file inside the server folder.");
    }

    // Connect using the validated URI string
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Atlas...");

    await Deal.deleteMany({});
    await Deal.insertMany(deals);
    
    console.log("Database Seeded Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();