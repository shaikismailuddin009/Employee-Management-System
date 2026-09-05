import React from 'react';

export function AbsenteeismWidget({ totalEmployees = 10 }) {
  // Balanced realistic attendance figures derived from total employee scale
  const annualLeaves = Math.max(Math.round(totalEmployees * 0.4), 2);
  const personalLeaves = Math.max(Math.round(totalEmployees * 0.2), 1);
  const otherLeaves = Math.max(Math.round(totalEmployees * 0.1), 1);

  // Heatmap matrix for working week (Monday - Friday across 5 tiers)
  const days = ['M', 'T', 'W', 'T', 'F'];
  const tiers = ['1x', '2x', '3x', '4x', '>5%'];

  // Matrix pattern representing active presence/absence indicators
  const matrix = [
    ['#2563eb', '#2563eb', '#1d4ed8', '#0f172a', '#2563eb'],
    ['#3b82f6', '#3b82f6', '#2563eb', '#3b82f6', '#60a5fa'],
    ['#60a5fa', '#93c5fd', '#3b82f6', '#84cc16', '#3b82f6'],
    ['#2563eb', '#3b82f6', '#60a5fa', '#84cc16', '#e2e8f0'],
    ['#dbeafe', '#eff6ff', '#84cc16', '#e2e8f0', '#f1f5f9'],
  ];

  return (
    <div className="card dashboard-absenteeism-card">
      <div className="absenteeism-grid">
        {/* Left column: Metrics & Segmented bar indicator */}
        <div className="absenteeism-left">
          <div className="card-header-clean">
            <div>
              <span className="card-eyebrow">Identify employees with absences</span>
              <h3 className="card-title">Absenteeism</h3>
            </div>
            <div className="info-badge-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Monitor trends & percentages</span>
            </div>
          </div>

          <div className="absence-stats-row">
            <div>
              <span className="absence-stat-val">{annualLeaves}</span>
              <span className="absence-stat-lbl">Annual</span>
            </div>
            <div>
              <span className="absence-stat-val">{personalLeaves}</span>
              <span className="absence-stat-lbl">Personal</span>
            </div>
            <div>
              <span className="absence-stat-val">{otherLeaves}</span>
              <span className="absence-stat-lbl">Other</span>
            </div>
          </div>

          {/* Segmented bar visual (replicates the barcode-style bars in reference) */}
          <div className="striped-bar-container">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`a-${i}`} className="stripe-bar stripe-blue" />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={`p-${i}`} className="stripe-bar stripe-lime" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={`o-${i}`} className="stripe-bar stripe-dark" />
            ))}
          </div>

          <div className="absence-legend">
            <span className="legend-item">
              <span className="legend-dot dot-blue" /> Annual
            </span>
            <span className="legend-item">
              <span className="legend-dot dot-lime" /> Personal
            </span>
            <span className="legend-item">
              <span className="legend-dot dot-dark" /> Other
            </span>
          </div>
        </div>

        {/* Right column: Presence Heat Grid (matches screenshot right matrix) */}
        <div className="absenteeism-right">
          <div className="heat-matrix">
            {matrix.map((row, rIdx) => (
              <div key={rIdx} className="heat-row">
                <span className="heat-tier-label">{tiers[rIdx]}</span>
                <div className="heat-cells">
                  {row.map((color, cIdx) => (
                    <div
                      key={cIdx}
                      className="heat-cell"
                      style={{ backgroundColor: color }}
                      title={`${days[cIdx]} - Level ${tiers[rIdx]}`}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="heat-days-header">
              <span className="heat-tier-spacer" />
              {days.map((d, i) => (
                <span key={i} className="heat-day-label">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsenteeismWidget;

