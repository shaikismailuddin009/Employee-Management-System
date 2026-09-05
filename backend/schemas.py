from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class EmployeeBase(BaseModel):
    employee_id: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None

    department: str
    job_title: str

    employment_type: str = "Permanent"
    status: str = "Active"

    hire_date: Optional[date] = None

    salary: float = 0
    performance_rating: float = 0

    avatar: Optional[str] = None


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

    department: Optional[str] = None
    job_title: Optional[str] = None

    employment_type: Optional[str] = None
    status: Optional[str] = None

    hire_date: Optional[date] = None

    salary: Optional[float] = None
    performance_rating: Optional[float] = None

    avatar: Optional[str] = None


class EmployeeResponse(EmployeeBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class DashboardStats(BaseModel):
    total_employees: int
    new_hires: int
    active_employees: int
    probation: int
    pending: int
    departments: int
    average_rating: float


class DepartmentStats(BaseModel):
    department: str
    employee_count: int