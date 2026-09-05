import React, { useState } from 'react';
import DepartmentBarChart from './DepartmentBarChart';
import ContractDonutChart from './ContractDonutChart';
import AbsenteeismWidget from './AbsenteeismWidget';
import TopPerformersCard from './TopPerformersCard';
import MetricsRatingCard from './MetricsRatingCard';

export function DashboardView({
  stats,
  departments = [],
  employees = [],
  onNavigate,
  onAddEmployeeClick,
  onSelectEmployee,
}) {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Filter department chart items if user selected specific department
  const filteredDepts = selectedDeptFilter === 'All'
    ? departments
    : departments.filter((d) => d.department === selectedDeptFilter);

  return (
    <div className="dashboard-container">
      {/* Dashboard Top Header Bar */}
      <div className="dashboard-title-row">
        <div className="dashboard-heading">
          <div className="dashboard-eyebrow-line">
            <span>Dashboard</span>
            <span className="badge-pro">PRO</span>
          </div>
          <h1 className="dashboard-title">Employee Summary</h1>
        </div>

        <div className="dashboard-controls">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onNavigate('employees')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Filter</span>
          </button>

          <div className="custom-select-wrapper">
            <select
              className="select-dropdown"
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.department} value={dept.department}>
                  {dept.department} ({dept.employee_count})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddEmployeeClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left content + Right sidebar */}
      <div className="dashboard-main-layout">
        {/* Left Column (Primary Insights) */}
        <div className="dashboard-left-col">
          {/* Top 3 Metric Stat Cards */}
          <div className="stats-cards-row">
            {/* Stat Card 1: Head Count */}
            <div className="card stat-card" onClick={() => onNavigate('employees')} style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <span className="stat-card-label">Head Count</span>
                <div className="stat-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="stat-card-body">
                <div className="stat-big-number">{stats?.total_employees ?? 10}</div>
                <div className="stat-subrow">
                  <span className="stat-subtext">
                    {stats?.new_hires ? `${stats.new_hires} New Hires` : 'Total Roster'}
                  </span>
                  <span className="stat-trend-badge trend-up">
                    +4.7%
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Stat Card 2: HR to Employee / Departments */}
            <div className="card stat-card" onClick={() => onNavigate('departments')} style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <span className="stat-card-label">HR to Employee</span>
                <div className="stat-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
              </div>
              <div className="stat-card-body">
                <div className="stat-big-number">{stats?.departments ?? 8}</div>
                <div className="stat-subrow">
                  <span className="stat-subtext">Operating Depts</span>
                  <span className="stat-trend-badge trend-neutral">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Stat Card 3: Status Breakdown */}
            <div className="card stat-card" onClick={() => onNavigate('employees')} style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <span className="stat-card-label">Status Breakdown</span>
                <div className="stat-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>
              <div className="stat-card-body">
                <div className="stat-big-number">{stats?.active_employees ?? 8}</div>
                <div className="stat-subrow">
                  <span className="stat-subtext">Active staff</span>
                  <div className="stat-mini-pills">
                    <span className="mini-pill probation-pill">
                      {stats?.probation ?? 1} Probation
                    </span>
                    <span className="mini-pill pending-pill">
                      {stats?.pending ?? 1} Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row: Department Pillars & Agreement Donut */}
          <div className="charts-two-col-row">
            <DepartmentBarChart
              departments={filteredDepts}
              onDepartmentClick={(dept) => {
                if (dept === 'All') {
                  onNavigate('departments');
                } else {
                  onNavigate('employees');
                }
              }}
            />

            <ContractDonutChart
              employees={employees}
              totalCount={stats?.total_employees}
            />
          </div>

          {/* Bottom Card: Absenteeism Tracker */}
          <AbsenteeismWidget totalEmployees={stats?.total_employees || 10} />
        </div>

        {/* Right Column (Satisfaction & Metrics) */}
        <div className="dashboard-right-col">
          <TopPerformersCard
            employees={employees}
            onSelectEmployee={onSelectEmployee}
          />

          <MetricsRatingCard
            averageRating={stats?.average_rating ?? 7.8}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardView;

