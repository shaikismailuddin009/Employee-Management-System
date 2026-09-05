/**
 * Employee Management System - API Service
 * Connects to FastAPI backend (http://127.0.0.1:8000)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

class ApiError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Helper to process response and extract error messages
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    let errorDetails = null;

    try {
      const errorJson = await response.json();
      errorDetails = errorJson;
      if (typeof errorJson.detail === 'string') {
        errorMessage = errorJson.detail;
      } else if (Array.isArray(errorJson.detail)) {
        // FastAPI Pydantic validation error list
        errorMessage = errorJson.detail
          .map((d) => `${d.loc ? d.loc.join('.') + ': ' : ''}${d.msg}`)
          .join(', ');
      }
    } catch {
      // Body wasn't JSON
    }

    throw new ApiError(errorMessage, response.status, errorDetails);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/**
 * API Endpoints
 */
export const api = {
  // System Health
  async getHealth() {
    const res = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(res);
  },

  // Dashboard Stats
  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
    return handleResponse(res);
  },

  // Employees
  async getEmployees({ search, department } = {}) {
    const params = new URLSearchParams();
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    if (department && department.trim() && department !== 'All') {
      params.append('department', department.trim());
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/employees${query}`);
    return handleResponse(res);
  },

  async getEmployee(id) {
    const res = await fetch(`${API_BASE_URL}/employees/${id}`);
    return handleResponse(res);
  },

  async createEmployee(employeeData) {
    // Format payload to match Pydantic schema
    const payload = {
      employee_id: employeeData.employee_id?.trim(),
      first_name: employeeData.first_name?.trim(),
      last_name: employeeData.last_name?.trim(),
      email: employeeData.email?.trim(),
      phone: employeeData.phone?.trim() || null,
      department: employeeData.department?.trim(),
      job_title: employeeData.job_title?.trim(),
      employment_type: employeeData.employment_type || 'Permanent',
      status: employeeData.status || 'Active',
      hire_date: employeeData.hire_date || null,
      salary: Number(employeeData.salary) || 0,
      performance_rating: Number(employeeData.performance_rating) || 0,
      avatar: employeeData.avatar || `${(employeeData.first_name?.[0] || '').toUpperCase()}${(employeeData.last_name?.[0] || '').toUpperCase()}` || null,
    };

    const res = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async updateEmployee(id, employeeData) {
    // Build update payload, omit employee_id as schema forbids updating ID
    const payload = {};
    if (employeeData.first_name !== undefined) payload.first_name = employeeData.first_name.trim();
    if (employeeData.last_name !== undefined) payload.last_name = employeeData.last_name.trim();
    if (employeeData.email !== undefined) payload.email = employeeData.email.trim();
    if (employeeData.phone !== undefined) payload.phone = employeeData.phone ? employeeData.phone.trim() : null;
    if (employeeData.department !== undefined) payload.department = employeeData.department.trim();
    if (employeeData.job_title !== undefined) payload.job_title = employeeData.job_title.trim();
    if (employeeData.employment_type !== undefined) payload.employment_type = employeeData.employment_type;
    if (employeeData.status !== undefined) payload.status = employeeData.status;
    if (employeeData.hire_date !== undefined) payload.hire_date = employeeData.hire_date || null;
    if (employeeData.salary !== undefined) payload.salary = Number(employeeData.salary) || 0;
    if (employeeData.performance_rating !== undefined) payload.performance_rating = Number(employeeData.performance_rating) || 0;
    if (employeeData.avatar !== undefined) payload.avatar = employeeData.avatar;

    const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async deleteEmployee(id) {
    const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  // Departments
  async getDepartments() {
    const res = await fetch(`${API_BASE_URL}/departments`);
    return handleResponse(res);
  },

  // Reports
  async getEmployeeReports() {
    const res = await fetch(`${API_BASE_URL}/reports/employees`);
    return handleResponse(res);
  },

  async getDepartmentReports() {
    const res = await fetch(`${API_BASE_URL}/reports/departments`);
    return handleResponse(res);
  },
};

export default api;

