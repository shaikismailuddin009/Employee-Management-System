import React from 'react';

export function ContractDonutChart({ employees = [], totalCount = 0 }) {
  // Calculate counts based on real employees data
  let permanent = 0;
  let contract = 0;
  let partTime = 0;

  if (employees && employees.length > 0) {
    employees.forEach((emp) => {
      const t = (emp.employment_type || '').toLowerCase();
      if (t.includes('contract')) {
        contract += 1;
      } else if (t.includes('part') || t.includes('intern')) {
        partTime += 1;
      } else {
        permanent += 1;
      }
    });
  } else {
    // Fallback ratio
    permanent = 8;
    contract = 2;
    partTime = 1;
  }

  const effectiveTotal = employees.length || totalCount || 10;
  const permPct = Math.round((permanent / effectiveTotal) * 100);
  const contPct = Math.round((contract / effectiveTotal) * 100);
  const partPct = Math.max(100 - permPct - contPct, 0);

  // SVG Gauge calculations for a 180-degree half circle arc
  // Radius R = 80, Circumference of half circle = Math.PI * 80 ≈ 251.3
  const halfCircumference = 251.3;
  const permLength = (permPct / 100) * halfCircumference;
  const contLength = (contPct / 100) * halfCircumference;
  const partLength = (partPct / 100) * halfCircumference;

  return (
    <div className="card dashboard-chart-card">
      <div className="card-header-clean">
        <div>
          <span className="card-eyebrow">Employment Agreement Tracker</span>
          <h3 className="card-title">Contact status</h3>
        </div>
        <button type="button" className="card-action-icon" title="View details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="gauge-container">
        {/* SVG Half Donut */}
        <div className="gauge-svg-wrapper">
          <svg viewBox="0 0 200 115" className="gauge-svg">
            {/* Background track */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* Permanent Arc (Blue) */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#2563eb"
              strokeWidth="24"
              strokeDasharray={`${permLength} ${halfCircumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />

            {/* Contract Arc (Lime) */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#84cc16"
              strokeWidth="24"
              strokeDasharray={`${contLength} ${halfCircumference}`}
              strokeDashoffset={`-${permLength}`}
              strokeLinecap="round"
            />

            {/* Part-Time Arc (Dark Slate) */}
            {partPct > 0 && (
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#0f172a"
                strokeWidth="24"
                strokeDasharray={`${partLength} ${halfCircumference}`}
                strokeDashoffset={`-${permLength + contLength}`}
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Center Text inside gauge */}
          <div className="gauge-center-text">
            <span className="gauge-number">{effectiveTotal}</span>
            <span className="gauge-sublabel">Total Employees</span>
          </div>
        </div>

        {/* Legend pills below chart */}
        <div className="gauge-legend">
          <div className="legend-item">
            <span className="legend-dot dot-blue" />
            <span className="legend-name">Permanent</span>
            <strong className="legend-val">{permPct}%</strong>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-lime" />
            <span className="legend-name">Contract</span>
            <strong className="legend-val">{contPct}%</strong>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-dark" />
            <span className="legend-name">Part-Time</span>
            <strong className="legend-val">{partPct}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractDonutChart;

