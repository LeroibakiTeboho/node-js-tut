//* Load employee data from JSON file (acts as database)
const Employee = require("../model/Employee");

//* CRUD operations

//! READ ALL
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({});
  if (!employees)
    return res.status(204).json({ message: "No employees found." });
  res.json(employees);
};

//! CREATE
const createNewEmployee = async (req, res) => {
  //* Validate the first and last names are provided in the request body. If not, return 400 Bad Request.
  if (!req.body.firstname || !req.body.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  //* Create a new employee document with the provided first and last names.
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

//! UPDATE
const updateEmployee = async (req, res) => {
  //* Validate the ID is provided in the request body. If not, return 400 Bad Request.
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID is required." });
  }

  //* Find the employee document in the database using the provided ID. If not found, return 204 No Content.
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  //* If the employee document is not found, return 204 No Content.
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matched ID ${req.body.id}` });
  }

  //* Update the employee document with the provided values.
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  //* Save the updated employee document to the database.
  const result = await employee.save();

  res.json(result);
};

//! DELETE
const deleteEmployee = async (req, res) => {
  //* Validate the ID is provided in the request body. If not, return 400 Bad Request.
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID is required" });

  //* Find the employee document in the database using the provided ID. If not found, return 204 No Content.
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  //* If the employee document is not found, return 204 No Content.
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matched ID ${req.body.id}` });
  }

  //* Delete the employee document from the database.
  const result = await employee.deleteOne({ _id: req.body.id });

  res.json(result);
};

//! GET EMPLOYEE BY ID
const getEmployeeById = async (req, res) => {
  //* Validate the ID is provided in the request body. If not, return 400 Bad Request.
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID is required" });

  //* Find the employee document in the database using the provided ID. If not found, return 204 No Content.
  const employee = await Employee.findOne({ _id: req.params.id }).exec();

  //* If the employee document is not found, return 204 No Content.
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matched ID ${req.params.id}` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
