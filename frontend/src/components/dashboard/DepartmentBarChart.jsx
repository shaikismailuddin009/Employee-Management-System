import React, { useState } from 'react';

export function DepartmentBarChart({ departments = [], onDepartmentClick }) {
  const [hoveredDept, setHoveredDept] = useState(null);

  // Fallback defaults if no departments loaded yet
  const items = departments.length > 0
    ? departments
    : [
        { department: 'Sales', employee_count: 2 },
        { department: 'Design', employee_count: 1 },
        { department: 'Finance', employee_count: 2 },
        { department: 'DevOps', employee_count: 1 },
        { department: 'Operations', employee_count: 1 },
        { department: 'Engineering', employee_count: 3 },
      ];

  const maxCount = Math.max(...items.map((d) => d.employee_count), 1);

  return (
    <div className="card dashboard-chart-card">
      <div className="card-header-clean">
        <div>
          <span className="card-eyebrow">Employee Count by Department</span>
          <h3 className="card-title">Track your team</h3>
        </div>
        <button
          type="button"
          className="card-action-icon"
          title="View all departments"
          onClick={() => onDepartmentClick && onDepartmentClick('All')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="pillar-chart-container">
        {items.map((item, index) => {
          const heightPercent = Math.max(Math.round((item.employee_count / maxCount) * 85), 20);
          const isHighest = item.employee_count === maxCount;
          const isHovered = hoveredDept === item.department;
          const activeState = isHovered || (hoveredDept === null && isHighest);

          return (
            <div
              key={item.department || index}
              className={`pillar-column ${activeState ? 'pillar-active' : ''}`}
              onMouseEnter={() => setHoveredDept(item.department)}
              onMouseLeave={() => setHoveredDept(null)}
              onClick={() => onDepartmentClick && onDepartmentClick(item.department)}
              style={{ cursor: 'pointer' }}
            >
              {/* Tooltip on top of active pillar */}
              <div className={`pillar-tooltip ${activeState ? 'show' : ''}`}>
                {item.employee_count} {item.employee_count === 1 ? 'Employee' : 'Employees'}
              </div>

              {/* Pill track & filled bar */}
              <div className="pillar-track">
                <div
                  className={`pillar-fill ${activeState ? 'fill-primary' : 'fill-dark'}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Department Name Label */}
              <span className="pillar-label" title={item.department}>
                {item.department.length > 8
                  ? `${item.department.substring(0, 7)}.`
                  : item.department}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentBarChart;

