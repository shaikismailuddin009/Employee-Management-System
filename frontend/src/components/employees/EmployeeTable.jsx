import React, { useState, useMemo } from 'react';
import { StatusBadge, TypeBadge, RatingBadge } from '../common/Badge';

export function EmployeeTable({
  employees = [],
  departments = [],
  onEditEmployee,
  onDeleteEmployee,
  initialSearch = '',
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('id-desc');

  // Filter & Search logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // Search across name, id, email, department, job title
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesName = `${emp.first_name || ''} ${emp.last_name || ''}`.toLowerCase().includes(q);
        const matchesId = (emp.employee_id || '').toLowerCase().includes(q);
        const matchesEmail = (emp.email || '').toLowerCase().includes(q);
        const matchesDept = (emp.department || '').toLowerCase().includes(q);
        const matchesJob = (emp.job_title || '').toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesEmail && !matchesDept && !matchesJob) {
          return false;
        }
      }

      // Department filter
      if (selectedDept !== 'All' && emp.department !== selectedDept) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'All' && (emp.status || '').toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
        case 'name-desc':
          return `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`);
        case 'salary-desc':
          return (b.salary || 0) - (a.salary || 0);
        case 'salary-asc':
          return (a.salary || 0) - (b.salary || 0);
        case 'rating-desc':
          return (b.performance_rating || 0) - (a.performance_rating || 0);
        case 'hire-desc':
          return new Date(b.hire_date || '1970-01-01') - new Date(a.hire_date || '1970-01-01');
        default: // 'id-desc'
          return (b.id || 0) - (a.id || 0);
      }
    });
  }, [employees, searchTerm, selectedDept, selectedStatus, sortBy]);

  const avatarColors = ['#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

  const formatSalary = (val) => {
    if (!val && val !== 0) return '—';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="employee-table-wrapper card">
      {/* Controls Bar: Search, Department filter, Status filter, Sort */}
      <div className="table-controls-bar">
        <div className="table-search-box">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="table-search-input"
            placeholder="Search by name, ID, email, position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
            >
              &times;
            </button>
          )}
        </div>

        <div className="table-filter-group">
          {/* Department Filter */}
          <select
            className="select-dropdown table-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.department} value={d.department}>
                {d.department}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="select-dropdown table-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Probation">Probation</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Sort By */}
          <select
            className="select-dropdown table-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id-desc">Latest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="salary-desc">Highest Salary</option>
            <option value="salary-asc">Lowest Salary</option>
            <option value="rating-desc">Highest Rating</option>
            <option value="hire-desc">Recently Joined</option>
          </select>
        </div>
      </div>

      {/* Table Information Count */}
      <div className="table-meta-bar">
        <span className="results-count">
          Showing <strong>{filteredEmployees.length}</strong> of{' '}
          <strong>{employees.length}</strong> employees
        </span>
        {(searchTerm || selectedDept !== 'All' || selectedStatus !== 'All') && (
          <button
            type="button"
            className="btn-text-link"
            onClick={() => {
              setSearchTerm('');
              setSelectedDept('All');
              setSelectedStatus('All');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Responsive Table */}
      <div className="table-scroll-container">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Contact</th>
              <th>Department</th>
              <th>Position</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th>Rating</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="10" className="table-empty-row">
                  <div className="empty-state-card">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <h4>No employees found</h4>
                    <p>Try adjusting your search query or department/status filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp, idx) => {
                const initials =
                  emp.avatar ||
                  `${(emp.first_name?.[0] || '').toUpperCase()}${(emp.last_name?.[0] || '').toUpperCase()}`;
                const avatarBg = avatarColors[idx % avatarColors.length];

                return (
                  <tr key={emp.id || emp.employee_id} className="table-row-hover">
                    {/* Employee Profile Cell */}
                    <td>
                      <div className="table-employee-profile">
                        <div
                          className="table-avatar"
                          style={{ backgroundColor: avatarBg }}
                        >
                          {initials}
                        </div>
                        <div className="table-emp-text">
                          <span className="emp-full-name">
                            {emp.first_name} {emp.last_name}
                          </span>
                          <span className="emp-id-badge">{emp.employee_id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Contact Cell */}
                    <td>
                      <div className="table-contact-cell">
                        <span className="contact-email">{emp.email}</span>
                        <span className="contact-phone">{emp.phone || '—'}</span>
                      </div>
                    </td>

                    {/* Department Cell */}
                    <td>
                      <span className="table-dept-pill">{emp.department}</span>
                    </td>

                    {/* Job Title Cell */}
                    <td>
                      <span className="table-job-title">{emp.job_title}</span>
                    </td>

                    {/* Employment Type */}
                    <td>
                      <TypeBadge type={emp.employment_type} />
                    </td>

                    {/* Salary */}
                    <td>
                      <span className="table-salary-val">
                        {formatSalary(emp.salary)}
                      </span>
                    </td>

                    {/* Joining Date */}
                    <td>
                      <span className="table-date-val">
                        {formatDate(emp.hire_date)}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <StatusBadge status={emp.status} />
                    </td>

                    {/* Rating */}
                    <td>
                      <RatingBadge rating={emp.performance_rating} showLabel={false} />
                    </td>

                    {/* Actions Cell */}
                    <td className="td-actions">
                      <div className="table-action-buttons">
                        <button
                          type="button"
                          className="action-btn edit-btn"
                          title="Edit Employee"
                          onClick={() => onEditEmployee(emp)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          className="action-btn delete-btn"
                          title="Delete Employee"
                          onClick={() => onDeleteEmployee(emp)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;

