// seed.js
import dotenv from "dotenv";
import Employee from "././src/models/Employee.js"// <-- update path if needed
import connectMongoDB from "././src/db/db.js";

dotenv.config();

// ---------------------------------------
// SAMPLE EMPLOYEES
// ---------------------------------------
const sampleEmployees = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    role: "Software Developer",
    department: "Engineering",
    city: "Mumbai",
    salary: 65000,
    joiningDate: "2023-10-15",
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9123456780",
    role: "HR Manager",
    department: "Human Resources",
    city: "Pune",
    salary: 55000,
    joiningDate: "2022-03-20",
  },
  {
    name: "Amit Verma",
    email: "amit@example.com",
    phone: "9988776655",
    role: "UI/UX Designer",
    department: "Design",
    city: "Bangalore",
    salary: 48000,
    joiningDate: "2024-01-09",
  },
  {
    name: "Arjun Mehta",
    role: "Senior Backend Engineer",
    department: "Engineering",
    salary: 850000,
    joiningDate: "2023-06-15",
    email: "arjun.mehta@company.com",
    phone: 9876543210,
    city: "Bangalore"
  },
  {
    name: "Priya Singh",
    role: "Frontend Developer",
    department: "Engineering",
    salary: 620000,
    joiningDate: "2024-01-20",
    email: "priya.singh@company.com",
    phone: 9123456780,
    city: "Mumbai"
  },
  {
    name: "Rahul Kapoor",
    role: "Data Scientist",
    department: "Analytics",
    salary: 950000,
    joiningDate: "2023-11-10",
    email: "rahul.kapoor@company.com",
    phone: 9988776655,
    city: "Hyderabad"
  },
  {
    name: "Ananya Sharma",
    role: "HR Business Partner",
    department: "Human Resources",
    salary: 480000,
    joiningDate: "2024-10-05",
    email: "ananya.sharma@company.com",
    phone: 8765432109,
    city: "Delhi"
  },
  {
    name: "Vikram Desai",
    role: "DevOps Engineer",
    department: "Engineering",
    salary: 720000,
    joiningDate: "2024-02-28",
    email: "vikram.desai@company.com",
    phone: 7654321098,
    city: "Pune"
  },
  {
    name: "Neha Reddy",
    role: "Product Manager",
    department: "Product",
    salary: 1100000,
    joiningDate: "2023-09-01",
    email: "neha.reddy@company.com",
    phone: 8877665544,
    city: "Chennai"
  },
  {
    name: "Siddharth Jain",
    role: "UI/UX Designer",
    department: "Design",
    salary: 550000,
    joiningDate: "2024-11-12",
    email: "siddharth.jain@company.com",
    phone: 9900112233,
    city: "Ahmedabad"
  },
  {
    name: "Kavya Nair",
    role: "Marketing Lead",
    department: "Marketing",
    salary: 680000,
    joiningDate: "2023-12-18",
    email: "kavya.nair@company.com",
    phone: 8899776655,
    city: "Kochi"
  },
  {
    name: "Rohan Malhotra",
    role: "Full Stack Developer",
    department: "Engineering",
    salary: 380000,
    joiningDate: "2024-11-20",
    email: "rohan.malhotra@company.com",
    phone: 7788990011,
    city: "Jaipur"
  },
  {
    name: "Ishaan Grover",
    role: "Chief Technology Officer",
    department: "Executive",
    salary: 2500000,
    joiningDate: "2022-04-01",
    email: "ishaan.grover@company.com",
    phone: 9998887770,
    city: "Gurgaon"
  }
];

// ---------------------------------------
// INSERT DATA
// ---------------------------------------
const seedData = async () => {
  await connectMongoDB();

  try {
    await Employee.deleteMany();
    console.log("Old employee records removed.");

    await Employee.insertMany(sampleEmployees);
    console.log("Sample employees added successfully!");

    process.exit();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedData();
