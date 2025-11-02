const Student = require('../models/studentModel');

const getHomepage = (req, res) => {
    res.render('index');
};

const getAllStudents = async (req, res) => {
    try {
        let query = {};
        const searchQuery = req.query.search;

        if (searchQuery) {
            query = { name: { $regex: searchQuery, $options: 'i' } };
        }

        const students = await Student.find(query);
        res.render('students', { 
            students: students, 
            searchQuery: searchQuery || ''
        });
    } catch (error) {
        res.status(500).send('Error fetching students');
    }
};

const getAddStudent = (req, res) => {
    res.render('add-student');
};

const postAddStudent = async (req, res) => {
    try {
        const { name, studentId, department, age } = req.body;
        const newStudent = new Student({ name, studentId, department, age });
        await newStudent.save();
        res.redirect('/students');
    } catch (error) {
        res.status(500).send('Error adding student');
    }
};

const getEditStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('edit-student', { student: student });
    } catch (error) {
        res.status(500).send('Error fetching student');
    }
};

const postEditStudent = async (req, res) => {
    try {
        const { name, studentId, department, age } = req.body;
        await Student.findByIdAndUpdate(req.params.id, { name, studentId, department, age });
        res.redirect('/students');
    } catch (error) {
        res.status(500).send('Error updating student');
    }
};

const postDeleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students');
    } catch (error) {
        res.status(500).send('Error deleting student');
    }
};

module.exports = {
    getAllStudents,
    getAddStudent,
    postAddStudent,
    getEditStudent,
    postEditStudent,
    postDeleteStudent,
    getHomepage
};