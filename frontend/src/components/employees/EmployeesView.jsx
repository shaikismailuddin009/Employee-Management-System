import React from 'react';
import EmployeeTable from './EmployeeTable';

export function EmployeesView({
  employees = [],
  departments = [],
  onAddEmployeeClick,
  onEditEmployee,
  onDeleteEmployee,
  searchQuery = '',
}) {
  return (
    <div className="employees-view-container">
      {/* Top Banner & Header */}
      <div className="view-header-row">
        <div>
          <div className="dashboard-eyebrow-line">
            <span>Directory</span>
            <span className="badge-pill-count">{employees.length} Records</span>
          </div>
          <h1 className="view-main-title">Employee Management</h1>
          <p className="view-subtitle">
            View, filter, update, or onboard new employees across all company departments
          </p>
        </div>

        <div className="view-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddEmployeeClick}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Main Employee Table */}
      <EmployeeTable
        employees={employees}
        departments={departments}
        onEditEmployee={onEditEmployee}
        onDeleteEmployee={onDeleteEmployee}
        initialSearch={searchQuery}
      />
    </div>
  );
}

export default EmployeesView;

