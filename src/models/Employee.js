import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
name: String,
role: String,
salary: Number,
joiningDate: Date,
department: String,
email: String,
phone: Number,
city: String,
});


const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;