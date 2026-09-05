import React from 'react';
import { RatingBadge, StatusBadge } from '../common/Badge';

export function ReportsView({
  employees = [],
  departments = [],
  departmentReports = [],
  stats,
}) {
  // Aggregate statistics
  const totalEmployees = employees.length || stats?.total_employees || 0;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length || stats?.active_employees || 0;
  const probationEmployees = employees.filter((e) => e.status === 'Probation').length || stats?.probation || 0;
  const pendingEmployees = employees.filter((e) => e.status === 'Pending').length || stats?.pending || 0;

  // Payroll / Salary analytics
  const salaries = employees.map((e) => Number(e.salary) || 0).filter((s) => s > 0);
  const totalPayroll = salaries.reduce((acc, curr) => acc + curr, 0);
  const avgSalary = salaries.length > 0 ? Math.round(totalPayroll / salaries.length) : 0;
  const maxSalary = salaries.length > 0 ? Math.max(...salaries) : 0;
  const minSalary = salaries.length > 0 ? Math.min(...salaries) : 0;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Export to CSV Function
  const exportToCSV = () => {
    if (employees.length === 0) return;

    const headers = [
      'Employee ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Department',
      'Job Title',
      'Employment Type',
      'Status',
      'Hire Date',
      'Salary',
      'Rating',
    ];

    const rows = employees.map((e) => [
      `"${e.employee_id || ''}"`,
      `"${e.first_name || ''}"`,
      `"${e.last_name || ''}"`,
      `"${e.email || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.department || ''}"`,
      `"${e.job_title || ''}"`,
      `"${e.employment_type || ''}"`,
      `"${e.status || ''}"`,
      `"${e.hire_date || ''}"`,
      `"${e.salary || 0}"`,
      `"${e.performance_rating || 0}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `employee_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-view-container">
      {/* Header */}
      <div className="view-header-row">
        <div>
          <div className="dashboard-eyebrow-line">
            <span>Executive Analytics</span>
            <span className="badge-pill-count">Live Report</span>
          </div>
          <h1 className="view-main-title">Reports & Workforce Insights</h1>
          <p className="view-subtitle">
            Comprehensive breakdown of staff distribution, payroll allocation, and performance metrics
          </p>
        </div>

        <div className="view-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handlePrint}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print Report</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={exportToCSV}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-cards-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card stat-card">
          <span className="stat-card-label">Total Headcount</span>
          <div className="stat-big-number">{totalEmployees}</div>
          <span className="stat-subtext">Active Workforce</span>
        </div>

        <div className="card stat-card">
          <span className="stat-card-label">Total Monthly/Annual Payroll</span>
          <div className="stat-big-number" style={{ fontSize: '26px' }}>
            {formatCurrency(totalPayroll)}
          </div>
          <span className="stat-subtext">Total compensation</span>
        </div>

        <div className="card stat-card">
          <span className="stat-card-label">Average Annual Salary</span>
          <div className="stat-big-number" style={{ fontSize: '26px' }}>
            {formatCurrency(avgSalary)}
          </div>
          <span className="stat-subtext">Across all divisions</span>
        </div>

        <div className="card stat-card">
          <span className="stat-card-label">Average Performance</span>
          <div className="stat-big-number" style={{ color: '#2563eb' }}>
            ★ {stats?.average_rating?.toFixed(1) || '7.8'}
          </div>
          <span className="stat-subtext">Company-wide score</span>
        </div>
      </div>

      {/* Salary Range & Status Breakdown */}
      <div className="charts-two-col-row" style={{ marginTop: '20px' }}>
        {/* Salary Distribution Card */}
        <div className="card dashboard-chart-card">
          <div className="card-header-clean">
            <div>
              <span className="card-eyebrow">Compensation Breakdown</span>
              <h3 className="card-title">Salary Summary</h3>
            </div>
          </div>

          <div className="salary-summary-body">
            <div className="salary-item-row">
              <span className="sal-lbl">Highest Compensation:</span>
              <strong className="sal-val sal-highlight">{formatCurrency(maxSalary)}</strong>
            </div>
            <div className="salary-item-row">
              <span className="sal-lbl">Average Compensation:</span>
              <strong className="sal-val">{formatCurrency(avgSalary)}</strong>
            </div>
            <div className="salary-item-row">
              <span className="sal-lbl">Entry Baseline:</span>
              <strong className="sal-val">{formatCurrency(minSalary)}</strong>
            </div>
            <div className="salary-item-row">
              <span className="sal-lbl">Total Annual Expenditure:</span>
              <strong className="sal-val">{formatCurrency(totalPayroll)}</strong>
            </div>
          </div>
        </div>

        {/* Status Distribution Card */}
        <div className="card dashboard-chart-card">
          <div className="card-header-clean">
            <div>
              <span className="card-eyebrow">Roster Demographics</span>
              <h3 className="card-title">Active vs Inactive Breakdown</h3>
            </div>
          </div>

          <div className="status-demographics-body">
            <div className="demo-item">
              <div className="demo-info">
                <span>Active Full-Time</span>
                <strong>{activeEmployees} ({Math.round((activeEmployees / (totalEmployees || 1)) * 100)}%)</strong>
              </div>
              <div className="dept-progress-track">
                <div
                  className="dept-progress-fill"
                  style={{ width: `${(activeEmployees / (totalEmployees || 1)) * 100}%`, backgroundColor: '#10b981' }}
                />
              </div>
            </div>

            <div className="demo-item">
              <div className="demo-info">
                <span>Probationary</span>
                <strong>{probationEmployees} ({Math.round((probationEmployees / (totalEmployees || 1)) * 100)}%)</strong>
              </div>
              <div className="dept-progress-track">
                <div
                  className="dept-progress-fill"
                  style={{ width: `${(probationEmployees / (totalEmployees || 1)) * 100}%`, backgroundColor: '#f59e0b' }}
                />
              </div>
            </div>

            <div className="demo-item">
              <div className="demo-info">
                <span>Pending Confirmation</span>
                <strong>{pendingEmployees} ({Math.round((pendingEmployees / (totalEmployees || 1)) * 100)}%)</strong>
              </div>
              <div className="dept-progress-track">
                <div
                  className="dept-progress-fill"
                  style={{ width: `${(pendingEmployees / (totalEmployees || 1)) * 100}%`, backgroundColor: '#3b82f6' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Department Performance Report Table */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header-clean" style={{ padding: '20px 24px' }}>
          <div>
            <span className="card-eyebrow">Operational Metrics</span>
            <h3 className="card-title">Department Distribution Summary</h3>
          </div>
        </div>

        <div className="table-scroll-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Employee Count</th>
                <th>Workforce Share</th>
                <th>Average Performance</th>
                <th>Operational Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => {
                const rep = departmentReports.find((r) => r.department === dept.department);
                const avg = rep?.average_rating || 0;
                const share = Math.round((dept.employee_count / (totalEmployees || 1)) * 100);

                return (
                  <tr key={dept.department}>
                    <td>
                      <strong style={{ color: '#0f172a' }}>{dept.department}</strong>
                    </td>
                    <td>{dept.employee_count} members</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="dept-progress-track" style={{ width: '80px', height: '6px' }}>
                          <div
                            className="dept-progress-fill"
                            style={{ width: `${Math.max(share, 10)}%` }}
                          />
                        </div>
                        <span>{share}%</span>
                      </div>
                    </td>
                    <td>
                      <RatingBadge rating={avg} />
                    </td>
                    <td>
                      <StatusBadge status="Active" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportsView;

