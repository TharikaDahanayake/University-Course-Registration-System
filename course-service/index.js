const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let courses = require('./courses.json');

// Get all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// Enroll in a course
app.post('/enroll', (req, res) => {
    const { studentId, courseId } = req.body;
    const course = courses.find(c => c.id === courseId);
       
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
       
    if (course.enrolledStudents.includes(studentId)) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledStudents.push(studentId);
    res.json({ message: 'Enrolled successfully', course });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Course Service running on port ${PORT}`);
});
