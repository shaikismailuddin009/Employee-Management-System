from datetime import date

from database import Base, engine, SessionLocal
from models import Employee


Base.metadata.create_all(bind=engine)


employees = [
    {
        "employee_id": "EMP001",
        "first_name": "Alice",
        "last_name": "Johnson",
        "email": "alice.johnson@company.com",
        "phone": "+91 9876500001",
        "department": "Engineering",
        "job_title": "Software Engineer",
        "employment_type": "Permanent",
        "status": "Active",
        "hire_date": date(2023, 2, 15),
        "salary": 850000,
        "performance_rating": 8.5,
        "avatar": "AJ",
    },
    {
        "employee_id": "EMP002",
        "first_name": "Elisabeth",
        "last_name": "Kim",
        "email": "elisabeth.kim@company.com",
        "phone": "+91 9876500002",
        "department": "Human Resources",
        "job_title": "HR Generalist",
        "employment_type": "Permanent",
        "status": "Active",
        "hire_date": date(2022, 7, 10),
        "salary": 720000,
        "performance_rating": 7.8,
        "avatar": "EK",
    },
    {
        "employee_id": "EMP003",
        "first_name": "Mark",
        "last_name": "Lee",
        "email": "mark.lee@company.com",
        "phone": "+91 9876500003",
        "department": "DevOps",
        "job_title": "DevOps Specialist",
        "employment_type": "Contract",
        "status": "Active",
        "hire_date": date(2024, 1, 20),
        "salary": 920000,
        "performance_rating": 7.8,
        "avatar": "ML",
    },
    {
        "employee_id": "EMP004",
        "first_name": "Theodorus",
        "last_name": "Ronald",
        "email": "theodorus.ronald@company.com",
        "phone": "+91 9876500004",
        "department": "Engineering",
        "job_title": "Software Engineer",
        "employment_type": "Permanent",
        "status": "Active",
        "hire_date": date(2023, 11, 5),
        "salary": 780000,
        "performance_rating": 7.2,
        "avatar": "TR",
    },
    {
        "employee_id": "EMP005",
        "first_name": "Bessie",
        "last_name": "Cooper",
        "email": "bessie.cooper@company.com",
        "phone": "+91 9876500005",
        "department": "Engineering",
        "job_title": "Software Engineer",
        "employment_type": "Permanent",
        "status": "Probation",
        "hire_date": date(2026, 8, 1),
        "salary": 650000,
        "performance_rating": 7.2,
        "avatar": "BC",
    },
    {
        "employee_id": "EMP006",
        "first_name": "Sarah",
        "last_name": "Lim",
        "email": "sarah.lim@company.com",
        "phone": "+91 9876500006",
        "department": "Marketing",
        "job_title": "Content Specialist",
        "employment_type": "Permanent",
        "status": "Active",
        "hire_date": date(2024, 5, 12),
        "salary": 600000,
        "performance_rating": 7.2,
        "avatar": "SL",
    },
    {
        "employee_id": "EMP007",
        "first_name": "David",
        "last_name": "Brown",
        "email": "david.brown@company.com",
        "phone": "+91 9876500007",
        "department": "Finance",
        "job_title": "Financial Analyst",
        "employment_type": "Permanent",
        "status": "Active",
        "hire_date": date(2021, 9, 18),
        "salary": 750000,
        "performance_rating": 8.1,
        "avatar": "DB",
    },
    {
        "employee_id": "EMP008",
        "first_name": "Emma",
        "last_name": "Wilson",
        "email": "emma.wilson@company.com",
        "phone": "+91 9876500008",
        "department": "Design",
        "job_title": "UI/UX Designer",
        "employment_type": "Contract",
        "status": "Active",
        "hire_date": date(2025, 3, 22),
        "salary": 700000,
        "performance_rating": 8.3,
        "avatar": "EW",
    },
    {
        "employee_id": "EMP009",
        "first_name": "James",
        "last_name": "Miller",
        "email": "james.miller@company.com",
        "phone": "+91 9876500009",
        "department": "Sales",
        "job_title": "Sales Executive",
        "employment_type": "Permanent",
        "status": "Pending",
        "hire_date": date(2026, 8, 20),
        "salary": 580000,
        "performance_rating": 6.9,
        "avatar": "JM",
    },
    {
        "employee_id": "EMP010",
        "first_name": "Sophia",
        "last_name": "Taylor",
        "email": "sophia.taylor@company.com",
        "phone": "+91 9876500010",
        "department": "Operations",
        "job_title": "Operations Manager",
        "employment_type": "Permanent",
        "status": "Active",
        "hire_date": date(2020, 6, 15),
        "salary": 950000,
        "performance_rating": 8.7,
        "avatar": "ST",
    },
]


def seed_database():
    db = SessionLocal()

    try:
        existing = db.query(Employee).count()

        if existing > 0:
            print(
                f"Database already contains "
                f"{existing} employees."
            )
            return

        for data in employees:
            db.add(Employee(**data))

        db.commit()

        print(
            f"Successfully added "
            f"{len(employees)} employees."
        )

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()