import React from 'react';

export function TopPerformersCard({ employees = [], onSelectEmployee }) {
  // Sort employees by performance_rating descending and take top 6
  const sorted = [...employees]
    .sort((a, b) => (b.performance_rating || 0) - (a.performance_rating || 0))
    .slice(0, 6);

  // Helper for avatar colors
  const avatarColors = [
    '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'
  ];

  return (
    <div className="card dashboard-top-rated-card">
      <div className="card-header-clean">
        <div>
          <span className="card-eyebrow">Top Satisfaction Score</span>
          <h3 className="card-title">Top 5 Rating</h3>
        </div>
        <button
          type="button"
          className="card-action-icon"
          title="View all employees"
          onClick={() => onSelectEmployee && onSelectEmployee(null)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="performer-list">
        {sorted.map((emp, index) => {
          const rating = Number(emp.performance_rating) || 0;
          const ratingLabel = rating >= 8.5 ? 'Excellent' : rating >= 7.0 ? 'Good' : 'Fair';
          const avatarBg = avatarColors[index % avatarColors.length];
          const initials = emp.avatar || `${(emp.first_name?.[0] || '').toUpperCase()}${(emp.last_name?.[0] || '').toUpperCase()}`;

          return (
            <div
              key={emp.id || emp.employee_id}
              className="performer-item"
              onClick={() => onSelectEmployee && onSelectEmployee(emp)}
              title={`View ${emp.first_name} ${emp.last_name}`}
            >
              <div className="performer-avatar" style={{ backgroundColor: avatarBg }}>
                {initials}
              </div>

              <div className="performer-info">
                <span className="performer-name">
                  {emp.first_name} {emp.last_name}
                </span>
                <span className="performer-role">{emp.job_title}</span>
              </div>

              <div className="performer-rating">
                <span className="star-icon">★</span>
                <span className="rating-num">{rating.toFixed(1)}</span>
                <span className="rating-grade">{ratingLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopPerformersCard;

