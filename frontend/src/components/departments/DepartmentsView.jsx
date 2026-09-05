import React, { useState, useMemo } from 'react';
import { RatingBadge } from '../common/Badge';

export function DepartmentsView({
  departments = [],
  departmentReports = [],
  employees = [],
  onNavigateToEmployees,
  onAddEmployeeToDept,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Merge department stats with average rating from departmentReports
  const enrichedDepartments = useMemo(() => {
    return departments.map((d) => {
      const rep = departmentReports.find((r) => r.department === d.department);
      const deptEmployees = employees.filter((e) => e.department === d.department);
      return {
        ...d,
        average_rating: rep?.average_rating || 0,
        employees: deptEmployees,
      };
    });
  }, [departments, departmentReports, employees]);

  const filteredDepts = useMemo(() => {
    if (!searchTerm.trim()) return enrichedDepartments;
    const q = searchTerm.toLowerCase();
    return enrichedDepartments.filter((d) => d.department.toLowerCase().includes(q));
  }, [enrichedDepartments, searchTerm]);

  const totalEmployees = employees.length || 1;
  const avatarColors = ['#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="departments-view-container">
      {/* View Header */}
      <div className="view-header-row">
        <div>
          <div className="dashboard-eyebrow-line">
            <span>Organization</span>
            <span className="badge-pill-count">{departments.length} Departments</span>
          </div>
          <h1 className="view-main-title">Department Directory</h1>
          <p className="view-subtitle">
            Overview of company operational divisions, team headcount, and performance metrics
          </p>
        </div>

        <div className="view-actions">
          <div className="table-search-box" style={{ width: '280px' }}>
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="table-search-input"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="departments-grid">
        {filteredDepts.map((dept, index) => {
          const count = dept.employee_count;
          const sharePercent = Math.round((count / totalEmployees) * 100);

          return (
            <div key={dept.department || index} className="card dept-card">
              <div className="dept-card-top">
                <div className="dept-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>

                <div className="dept-header-right">
                  <span className="dept-count-badge">
                    {count} {count === 1 ? 'Member' : 'Members'}
                  </span>
                </div>
              </div>

              <h3 className="dept-name">{dept.department}</h3>

              {/* Progress Bar of Workforce Share */}
              <div className="dept-workforce-section">
                <div className="dept-workforce-labels">
                  <span>Workforce share</span>
                  <strong>{sharePercent}%</strong>
                </div>
                <div className="dept-progress-track">
                  <div
                    className="dept-progress-fill"
                    style={{ width: `${Math.max(sharePercent, 8)}%` }}
                  />
                </div>
              </div>

              {/* Rating & Details */}
              <div className="dept-metrics-row">
                <div className="dept-metric">
                  <span className="dept-metric-lbl">Avg Rating</span>
                  <RatingBadge rating={dept.average_rating} showLabel={false} />
                </div>
                <div className="dept-metric">
                  <span className="dept-metric-lbl">Status</span>
                  <span className="status-badge badge-active">Active</span>
                </div>
              </div>

              {/* Team Avatars preview */}
              {dept.employees.length > 0 && (
                <div className="dept-team-avatars">
                  <span className="team-preview-lbl">Team:</span>
                  <div className="avatar-group">
                    {dept.employees.slice(0, 4).map((m, mIdx) => {
                      const init =
                        m.avatar ||
                        `${(m.first_name?.[0] || '').toUpperCase()}${(m.last_name?.[0] || '').toUpperCase()}`;
                      return (
                        <div
                          key={m.id || mIdx}
                          className="group-avatar"
                          style={{ backgroundColor: avatarColors[mIdx % avatarColors.length] }}
                          title={`${m.first_name} ${m.last_name} (${m.job_title})`}
                        >
                          {init}
                        </div>
                      );
                    })}
                    {dept.employees.length > 4 && (
                      <div className="group-avatar avatar-overflow">
                        +{dept.employees.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="dept-card-footer">
                <button
                  type="button"
                  className="btn btn-outline btn-sm dept-action-btn"
                  onClick={() => onNavigateToEmployees(dept.department)}
                >
                  <span>View Members</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentsView;

