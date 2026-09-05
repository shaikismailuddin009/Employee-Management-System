from datetime import date
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import func
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Employee
from schemas import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeResponse,
    DashboardStats,
    DepartmentStats
)

from crud import (
    get_employees,
    get_employee,
    create_employee,
    update_employee,
    delete_employee
)


# --------------------------------------------------
# DATABASE
# --------------------------------------------------

Base.metadata.create_all(bind=engine)


# --------------------------------------------------
# APPLICATION
# --------------------------------------------------

app = FastAPI(
    title="Employee Management System API",
    description="REST API for managing employees, departments and reports.",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Employee Management System API",
        "status": "running"
    }


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# EMPLOYEES
# --------------------------------------------------

@app.get(
    "/employees",
    response_model=list[EmployeeResponse]
)
def list_employees(
    search: Optional[str] = Query(
        default=None
    ),
    department: Optional[str] = Query(
        default=None
    ),
    db: Session = Depends(get_db)
):
    return get_employees(
        db,
        search=search,
        department=department
    )


@app.get(
    "/employees/{employee_id}",
    response_model=EmployeeResponse
)
def employee_details(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = get_employee(
        db,
        employee_id
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@app.post(
    "/employees",
    response_model=EmployeeResponse,
    status_code=201
)
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):
    existing_id = db.query(Employee).filter(
        Employee.employee_id ==
        employee.employee_id
    ).first()

    if existing_id:
        raise HTTPException(
            status_code=400,
            detail="Employee ID already exists"
        )

    existing_email = db.query(Employee).filter(
        Employee.email ==
        employee.email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return create_employee(
        db,
        employee
    )


@app.put(
    "/employees/{employee_id}",
    response_model=EmployeeResponse
)
def edit_employee(
    employee_id: int,
    employee: EmployeeUpdate,
    db: Session = Depends(get_db)
):
    updated = update_employee(
        db,
        employee_id,
        employee
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return updated


@app.delete(
    "/employees/{employee_id}"
)
def remove_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_employee(
        db,
        employee_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {
        "message": "Employee deleted successfully"
    }


# --------------------------------------------------
# DEPARTMENTS
# --------------------------------------------------

@app.get(
    "/departments",
    response_model=list[DepartmentStats]
)
def departments(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Employee.department,
            func.count(Employee.id)
        )
        .group_by(Employee.department)
        .order_by(
            func.count(Employee.id).desc()
        )
        .all()
    )

    return [
        {
            "department": department,
            "employee_count": count
        }
        for department, count in results
    ]


# --------------------------------------------------
# DASHBOARD
# --------------------------------------------------

@app.get(
    "/dashboard/stats",
    response_model=DashboardStats
)
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total = db.query(
        Employee
    ).count()

    active = db.query(
        Employee
    ).filter(
        Employee.status == "Active"
    ).count()

    probation = db.query(
        Employee
    ).filter(
        Employee.status == "Probation"
    ).count()

    pending = db.query(
        Employee
    ).filter(
        Employee.status == "Pending"
    ).count()

    departments_count = db.query(
        Employee.department
    ).distinct().count()

    average_rating = db.query(
        func.avg(
            Employee.performance_rating
        )
    ).scalar() or 0

    today = date.today()

    new_hires = db.query(
        Employee
    ).filter(
        Employee.hire_date.isnot(None),
        Employee.hire_date >= date(
            today.year,
            today.month,
            1
        )
    ).count()

    return {
        "total_employees": total,
        "new_hires": new_hires,
        "active_employees": active,
        "probation": probation,
        "pending": pending,
        "departments": departments_count,
        "average_rating": round(
            float(average_rating),
            2
        )
    }


# --------------------------------------------------
# REPORTS
# --------------------------------------------------

@app.get("/reports/employees")
def employee_report(
    db: Session = Depends(get_db)
):
    employees = db.query(
        Employee
    ).order_by(
        Employee.department,
        Employee.last_name
    ).all()

    return {
        "total_records": len(employees),
        "employees": [
            {
                "employee_id": employee.employee_id,
                "name": (
                    f"{employee.first_name} "
                    f"{employee.last_name}"
                ),
                "department": employee.department,
                "job_title": employee.job_title,
                "status": employee.status,
                "employment_type":
                    employee.employment_type,
                "hire_date":
                    employee.hire_date,
                "performance_rating":
                    employee.performance_rating
            }
            for employee in employees
        ]
    }


@app.get("/reports/departments")
def department_report(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Employee.department,
            func.count(Employee.id),
            func.avg(
                Employee.performance_rating
            )
        )
        .group_by(Employee.department)
        .all()
    )

    return {
        "departments": [
            {
                "department": department,
                "employee_count": count,
                "average_rating": round(
                    float(avg_rating or 0),
                    2
                )
            }
            for (
                department,
                count,
                avg_rating
            ) in results
        ]
    }