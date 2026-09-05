from sqlalchemy.orm import Session
from sqlalchemy import or_

from models import Employee
from schemas import EmployeeCreate, EmployeeUpdate


def get_employees(
    db: Session,
    search: str | None = None,
    department: str | None = None
):
    query = db.query(Employee)

    if search:
        value = f"%{search}%"

        query = query.filter(
            or_(
                Employee.employee_id.ilike(value),
                Employee.first_name.ilike(value),
                Employee.last_name.ilike(value),
                Employee.email.ilike(value),
                Employee.department.ilike(value),
                Employee.job_title.ilike(value)
            )
        )

    if department:
        query = query.filter(
            Employee.department == department
        )

    return query.order_by(Employee.id.desc()).all()


def get_employee(
    db: Session,
    employee_id: int
):
    return db.query(Employee).filter(
        Employee.id == employee_id
    ).first()


def create_employee(
    db: Session,
    employee: EmployeeCreate
):
    db_employee = Employee(
        **employee.model_dump()
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return db_employee


def update_employee(
    db: Session,
    employee_id: int,
    employee: EmployeeUpdate
):
    db_employee = get_employee(db, employee_id)

    if not db_employee:
        return None

    update_data = employee.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(db_employee, field, value)

    db.commit()
    db.refresh(db_employee)

    return db_employee


def delete_employee(
    db: Session,
    employee_id: int
):
    db_employee = get_employee(db, employee_id)

    if not db_employee:
        return None

    db.delete(db_employee)
    db.commit()

    return db_employee