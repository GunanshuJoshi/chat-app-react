import { config } from "dotenv";
import { mongoDB } from "../lib/mongodb.lib.js";
import { User } from "../model/user.model.js";

config();

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    name: "Emma Thompson",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    name: "Olivia Miller",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    name: "Sophia Davis",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    name: "Ava Wilson",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    name: "Isabella Brown",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    name: "Mia Johnson",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    name: "Charlotte Williams",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    name: "Amelia Garcia",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    name: "James Anderson",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    name: "William Clark",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    name: "Benjamin Taylor",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    name: "Lucas Moore",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    name: "Henry Jackson",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    name: "Alexander Martin",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    name: "Daniel Rodriguez",
    password: "Admin@123",
    dp: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await mongoDB();

    await User.insertMany(seedUsers);
    // await User.deleteMany({ email: { $in: seedUsers.map(user => user.email) } });
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
