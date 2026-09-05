# 👥 Employee Management System

A modern full-stack Employee Management System designed to help organizations manage employee records, departments, workforce information, and organizational reports through a clean and professional web interface.

The application combines a React frontend with a Python FastAPI backend and SQLite database to provide a complete CRUD-based employee management workflow.

---

## 🚀 Features

### 📊 Employee Dashboard
- Total employee overview
- Employee status statistics
- Department-wise employee distribution
- Workforce insights
- Employee performance information
- Employee satisfaction and rating information
- Modern dashboard analytics

### 👥 Employee Management
- View employee records
- Search employees
- Manage employee information
- View employee details
- Manage employee status
- Edit employee records
- Delete employee records

### ➕ Employee Registration
- Add new employees
- Employee registration form
- Department assignment
- Job position/designation
- Contact information
- Joining date
- Employment information

### ✏️ Employee Updates
- Edit existing employee records
- Update employee information
- Modify department and position
- Update contact and employment details

### 🗑️ Employee Deletion
- Delete employee records
- Delete confirmation
- Automatic interface refresh

### 🏢 Department Management
- Manage organizational departments
- View department information
- Employee distribution by department
- Department statistics

### 📈 Reports & Analytics
- Employee statistics
- Workforce information
- Department analysis
- Organizational reports
- Employee performance information

### ⚙️ Settings
- System configuration
- Company profile information
- Database management
- Backend connection status
- Application settings

### 🔄 REST API Integration
- React frontend connected with FastAPI
- REST API communication
- CRUD operations
- Database operations
- Frontend-backend integration

---

## 🛠️ Technology Stack

### Frontend

- React
- JavaScript
- Vite
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### Database

- SQLite
- SQLAlchemy

### Development Tools

- Git
- GitHub
- VS Code

---

## 🏗️ System Architecture

```text
                    Employee Management System
                              │
                              ▼
                   ┌─────────────────────┐
                   │    React Frontend   │
                   │                     │
                   │ Dashboard           │
                   │ Employees           │
                   │ Departments         │
                   │ Reports             │
                   │ Settings            │
                   └──────────┬──────────┘
                              │
                         REST API
                              │
                              ▼
                   ┌─────────────────────┐
                   │   FastAPI Backend   │
                   │                     │
                   │ Employee APIs       │
                   │ CRUD Operations     │
                   │ Department APIs     │
                   │ Reports/Data        │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │     SQLAlchemy      │
                   │   Database Layer    │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │   SQLite Database   │
                   │    employee.db      │
                   └─────────────────────┘
```                   
Employee Management System/
│
├── backend/
│   ├── crud.py
│   ├── database.py
│   ├── employee.db
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── schemas.py
│   └── seed.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── screenshots/
│   ├── add-employee.png
│   ├── dashboard.png
│   ├── departments.png
│   ├── edit-employee.png
│   ├── employee-management.png
│   ├── reports.png
│   └── settings.png
│
├── README.md
└── .gitignore
```
🖥️ Application Screenshots
📊 Employee Dashboard

The dashboard provides a centralized overview of employees, departments, workforce statistics, employee ratings, and organizational information.

👥 Employee Management

The employee management interface allows users to view, search, and manage employee records.

➕ Add New Employee

The employee registration interface allows administrators to add new employees and enter their organizational information.

✏️ Edit Employee

Existing employee records can be updated through the employee editing interface.

🏢 Department Management

The department management section provides an organized view of departments and their associated employees.

📈 Reports & Analytics

The reports section provides organizational information and employee analytics.

⚙️ Settings

The settings interface provides system configuration, company information, backend connection status, and database management options.
```
⚙️ Running the Project Locally
1. Clone the Repository
git clone https://github.com/shaikismailuddin009/Employee-Management-System.git
cd Employee-Management-System
2. Start the Backend

Navigate to the backend directory:

cd backend

Create a Python virtual environment:

python -m venv venv

Activate the virtual environment:

.\venv\Scripts\Activate.ps1

Install the backend dependencies:

pip install -r requirements.txt

Start the FastAPI server:

python -m uvicorn main:app --reload

The backend will normally run at:

http://127.0.0.1:8000
3. FastAPI Documentation

FastAPI provides interactive API documentation.

Open:

http://127.0.0.1:8000/docs

The documentation can be used to inspect and test the available API endpoints.

4. Start the Frontend

Open a new terminal:

cd frontend

Install frontend dependencies:

npm install

Start the development server:

npm run dev

Vite will provide a local URL, normally:

http://localhost:5173

Open the URL in your browser.

🔗 API Integration

The React frontend communicates with the FastAPI backend through REST API endpoints.

The backend provides functionality for:

Employee creation
Employee retrieval
Employee updates
Employee deletion
Department information
Employee statistics
Organizational data
Reports

The frontend uses the backend API to retrieve and modify employee information.

🗄️ Database

The application uses SQLite for local database storage.

SQLAlchemy is used as the database interaction layer between the FastAPI backend and SQLite database.

React Frontend
      │
      ▼
FastAPI Backend
      │
      ▼
SQLAlchemy
      │
      ▼
SQLite Database

Employee records and organizational information are stored in the database and accessed through the backend API.

🔄 CRUD Operations

The system implements the four fundamental database operations:

CREATE
   │
   ▼
Add New Employee
   │
   ▼
READ
   │
   ▼
View / Search Employees
   │
   ▼
UPDATE
   │
   ▼
Edit Employee
   │
   ▼
DELETE
   │
   ▼
Remove Employee
🔍 Employee Search

The employee management interface provides search functionality to help users quickly locate employee records.

Users can search available employee information and manage the corresponding records.

📊 Reports & Analytics

The reports section provides organizational information that can be used to understand:

Employee distribution
Department information
Workforce statistics
Employee performance
Organizational data
🔐 Security

Sensitive information should not be committed to GitHub.

Use environment variables for sensitive configuration such as:

API keys
Database credentials
Authentication secrets
Other private configuration

Never commit real credentials or sensitive .env files.

🎯 Internship Task
Task 4 – Employee Management System
Description

Create software to manage employee records and organizational data.

Task Workflow
Design employee management screens
Implement employee registration
Add update and deletion modules
Generate employee reports
Optimize application performance
Skills Learned
Software Development Lifecycle
Database Operations
Application Design
Performance Optimization
REST API Development
CRUD Operations
Frontend-Backend Integration
Key Features
Employee Records
Department Management
Search Employees
Reports Generation
📌 Project Status

Current Status: Functional Full-Stack Employee Management Application

The project includes:

✅ Professional Employee Dashboard
✅ Employee Management
✅ Employee Registration
✅ Employee Editing
✅ Employee Deletion
✅ Employee Search
✅ Department Management
✅ Reports & Analytics
✅ Settings
✅ FastAPI Backend
✅ REST API Integration
✅ SQLite Database
✅ SQLAlchemy
✅ React Frontend
✅ Frontend-Backend Integration
✅ CRUD Operations
✅ Professional Management Interface
🎓 Skills Demonstrated

This project demonstrates practical experience in:

Full-Stack Web Development
React
JavaScript
Python
FastAPI
REST APIs
CRUD Operations
SQLAlchemy
SQLite
Database Management
Frontend-Backend Integration
Application Architecture
UI/UX Design
Git
GitHub
Software Development Lifecycle
💼 Portfolio Value

This project demonstrates the ability to build a complete full-stack business application from the frontend interface to the backend API and database layer.

It can be used as an internship project, GitHub portfolio project, and demonstration of practical software development skills.

👨‍💻 Author

Shaik Ismailuddin

B.Tech Computer Science Engineering

📄 License

This project is developed for educational, internship, and portfolio purposes.