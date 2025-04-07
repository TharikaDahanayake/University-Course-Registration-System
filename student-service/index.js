const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const studentsFilePath = 'C:/Users/thari/Desktop/university-course-registration/student-service/students.json';


// Load students data from file without caching
let students = [];
try {
    const data = fs.readFileSync(studentsFilePath, 'utf8');
    students = JSON.parse(data);
} catch (err) {
    console.error('Error reading students.json:', err);
    students = [];
}

// Get student schedule
app.get('/schedule/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ schedule: student.schedule });
});

// Register a new student
app.post('/register', (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: 'Missing student id or name' });
    }

    const newStudent = { id, name, schedule: [] };
    students.push(newStudent);

    // Save the updated students array to students.json
    fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), (err) => {
        if (err) {
            console.error('Error saving to students.json:', err);
            return res.status(500).json({ message: 'Error saving student data' });
        }

        console.log('Student registered:', newStudent);
        res.json({ message: 'Student registered successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Student Service running on port ${PORT}`);
});
