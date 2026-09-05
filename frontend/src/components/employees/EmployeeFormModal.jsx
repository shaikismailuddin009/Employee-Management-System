import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  employee = null,
  departments = [],
  isLoading = false,
  apiError = null,
}) {
  const isEdit = Boolean(employee && employee.id);

  const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    custom_department: '',
    job_title: '',
    employment_type: 'Permanent',
    status: 'Active',
    hire_date: new Date().toISOString().split('T')[0],
    salary: 650000,
    performance_rating: 7.5,
    avatar: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        employee_id: employee.employee_id || '',
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        department: employee.department || 'Engineering',
        custom_department: '',
        job_title: employee.job_title || '',
        employment_type: employee.employment_type || 'Permanent',
        status: employee.status || 'Active',
        hire_date: employee.hire_date || '',
        salary: employee.salary ?? 650000,
        performance_rating: employee.performance_rating ?? 7.5,
        avatar: employee.avatar || '',
      });
    } else {
      // Default reset for new employee
      const randomNum = Math.floor(100 + Math.random() * 900);
      setFormData({
        employee_id: `EMP${randomNum}`,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department: departments[0]?.department || 'Engineering',
        custom_department: '',
        job_title: '',
        employment_type: 'Permanent',
        status: 'Active',
        hire_date: new Date().toISOString().split('T')[0],
        salary: 600000,
        performance_rating: 7.5,
        avatar: '',
      });
    }
    setErrors({});
  }, [employee, isOpen, departments]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-compute avatar initials if not manually set
      if ((field === 'first_name' || field === 'last_name') && !prev.avatar) {
        const f = field === 'first_name' ? value : prev.first_name;
        const l = field === 'last_name' ? value : prev.last_name;
        updated.avatar = `${(f?.[0] || '').toUpperCase()}${(l?.[0] || '').toUpperCase()}`;
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!isEdit && !formData.employee_id.trim()) {
      errs.employee_id = 'Employee ID is required';
    }
    if (!formData.first_name.trim()) {
      errs.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      errs.last_name = 'Last name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.job_title.trim()) {
      errs.job_title = 'Job title is required';
    }
    const finalDept = formData.department === '__custom__'
      ? formData.custom_department.trim()
      : formData.department.trim();

    if (!finalDept) {
      errs.department = 'Department is required';
    }
    if (formData.salary < 0) {
      errs.salary = 'Salary cannot be negative';
    }
    if (formData.performance_rating < 0 || formData.performance_rating > 10) {
      errs.performance_rating = 'Rating must be between 0 and 10';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalDept = formData.department === '__custom__'
      ? formData.custom_department.trim()
      : formData.department.trim();

    const payload = {
      ...formData,
      department: finalDept,
      salary: Number(formData.salary) || 0,
      performance_rating: Number(formData.performance_rating) || 0,
    };
    delete payload.custom_department;

    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Employee Details' : 'Add New Employee'}
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit} className="employee-form">
        {apiError && (
          <div className="form-alert-error" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        <div className="form-grid">
          {/* Employee ID */}
          <div className="form-group">
            <label className="form-label">
              Employee ID {!isEdit && <span className="req">*</span>}
            </label>
            <input
              type="text"
              className={`form-input ${errors.employee_id ? 'input-error' : ''}`}
              placeholder="e.g. EMP011"
              value={formData.employee_id}
              onChange={(e) => handleChange('employee_id', e.target.value)}
              disabled={isEdit}
            />
            {errors.employee_id && <span className="error-text">{errors.employee_id}</span>}
          </div>

          {/* Avatar / Initials */}
          <div className="form-group">
            <label className="form-label">Avatar Initials</label>
            <input
              type="text"
              className="form-input"
              maxLength="3"
              placeholder="e.g. JD"
              value={formData.avatar}
              onChange={(e) => handleChange('avatar', e.target.value.toUpperCase())}
            />
          </div>

          {/* First Name */}
          <div className="form-group">
            <label className="form-label">
              First Name <span className="req">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.first_name ? 'input-error' : ''}`}
              placeholder="e.g. Alice"
              value={formData.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
            />
            {errors.first_name && <span className="error-text">{errors.first_name}</span>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label className="form-label">
              Last Name <span className="req">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.last_name ? 'input-error' : ''}`}
              placeholder="e.g. Johnson"
              value={formData.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
            />
            {errors.last_name && <span className="error-text">{errors.last_name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">
              Email Address <span className="req">*</span>
            </label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="e.g. alice@company.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. +91 9876543210"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label className="form-label">
              Department <span className="req">*</span>
            </label>
            <select
              className={`form-input ${errors.department ? 'input-error' : ''}`}
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
            >
              {departments.map((d) => (
                <option key={d.department} value={d.department}>
                  {d.department}
                </option>
              ))}
              <option value="__custom__">+ Add Custom Department</option>
            </select>
            {formData.department === '__custom__' && (
              <input
                type="text"
                className="form-input"
                style={{ marginTop: '8px' }}
                placeholder="Type new department name"
                value={formData.custom_department}
                onChange={(e) => handleChange('custom_department', e.target.value)}
              />
            )}
            {errors.department && <span className="error-text">{errors.department}</span>}
          </div>

          {/* Job Title */}
          <div className="form-group">
            <label className="form-label">
              Job Title <span className="req">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.job_title ? 'input-error' : ''}`}
              placeholder="e.g. Software Engineer"
              value={formData.job_title}
              onChange={(e) => handleChange('job_title', e.target.value)}
            />
            {errors.job_title && <span className="error-text">{errors.job_title}</span>}
          </div>

          {/* Employment Type */}
          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <select
              className="form-input"
              value={formData.employment_type}
              onChange={(e) => handleChange('employment_type', e.target.value)}
            >
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Probation">Probation</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Joining Date */}
          <div className="form-group">
            <label className="form-label">Joining Date</label>
            <input
              type="date"
              className="form-input"
              value={formData.hire_date}
              onChange={(e) => handleChange('hire_date', e.target.value)}
            />
          </div>

          {/* Salary */}
          <div className="form-group">
            <label className="form-label">Salary (₹ / $)</label>
            <input
              type="number"
              className={`form-input ${errors.salary ? 'input-error' : ''}`}
              placeholder="e.g. 750000"
              value={formData.salary}
              onChange={(e) => handleChange('salary', e.target.value)}
              min="0"
              step="1000"
            />
            {errors.salary && <span className="error-text">{errors.salary}</span>}
          </div>

          {/* Performance Rating */}
          <div className="form-group">
            <label className="form-label">Performance Rating (0 - 10)</label>
            <div className="range-with-val">
              <input
                type="number"
                className={`form-input ${errors.performance_rating ? 'input-error' : ''}`}
                value={formData.performance_rating}
                onChange={(e) => handleChange('performance_rating', e.target.value)}
                min="0"
                max="10"
                step="0.1"
              />
            </div>
            {errors.performance_rating && (
              <span className="error-text">{errors.performance_rating}</span>
            )}
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : isEdit ? 'Update Employee' : 'Create Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EmployeeFormModal;

