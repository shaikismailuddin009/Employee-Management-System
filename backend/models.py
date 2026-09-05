from sqlalchemy import Column, Integer, String, Float, Date
from database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)

    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True
    )

    phone = Column(String(30), nullable=True)

    department = Column(
        String(100),
        nullable=False,
        index=True
    )

    job_title = Column(String(100), nullable=False)

    employment_type = Column(
        String(50),
        default="Permanent"
    )

    status = Column(
        String(50),
        default="Active",
        index=True
    )

    hire_date = Column(Date, nullable=True)

    salary = Column(Float, default=0)

    performance_rating = Column(Float, default=0)

    avatar = Column(String(10), nullable=True)