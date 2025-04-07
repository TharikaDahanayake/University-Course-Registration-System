# University Course Registration System

## Overview
This project implements a University Course Registration System using Node.js with a Service-Oriented Architecture (SOA). It consists of two main services: Course Service and Student Service. 

## Services

### Course Service
- **Base URL**: `http://localhost:3001`
- **Endpoints**:
  - `GET /courses`: Retrieve all courses.
  - `POST /enroll`: Enroll a student in a course.
    - Request Body: `{ "studentId": "student_id", "courseId": "course_id" }`
    - code in terminal: 'Invoke-WebRequest -Uri http://localhost:3001/enroll -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"studentId": "student_2", "courseId": "1"}'

### Student Service
- **Base URL**: `http://localhost:3002`
- **Endpoints**:
  - `GET /schedule/:studentId`: Retrieve the schedule for a student.
    - code in terminal: 'Invoke-WebRequest -Uri http://localhost:3002/schedule/student_2 -Method GET'

  - `POST /register`: Register a new student.
    - Request Body: `{ "id": "student_id", "name": "student_name" }`
    - code in terminal: 'Invoke-WebRequest -Uri http://localhost:3002/register -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"id": "student_2", "name": "Jane Smith"}'


## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository.
2. Navigate to each service directory (`course-service` and `student-service`).
3. Run `npm install` to install dependencies.

### Running the Services
1. Start the Course Service:
   ```bash
   cd course-service
   node index.js

2. Start the Student Service:
   ```bash
   cd student-service
   node index.js

