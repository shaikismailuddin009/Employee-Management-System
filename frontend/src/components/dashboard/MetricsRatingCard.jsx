import React from 'react';

export function MetricsRatingCard({ averageRating = 7.8 }) {
  const avg = Number(averageRating) || 7.8;

  return (
    <div className="card dashboard-metrics-card">
      <div className="card-header-clean">
        <div>
          <span className="card-eyebrow">Performance Evaluation Results</span>
          <h3 className="card-title">Metrics Rating</h3>
        </div>
        <button type="button" className="card-action-icon" title="View details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="metrics-body">
        {/* Big Average Star Rating */}
        <div className="avg-rating-row">
          <span className="star-large">★</span>
          <span className="avg-rating-score">{avg.toFixed(1)}</span>
          <span className="avg-rating-label">Average rating</span>
        </div>

        {/* Segmented Percentage Bar */}
        <div className="metrics-segmented-bar">
          <div className="bar-segment seg-excellent" style={{ width: '40%' }}>
            <span className="seg-percent">40%</span>
          </div>
          <div className="bar-segment seg-good" style={{ width: '30%' }}>
            <span className="seg-percent">30%</span>
          </div>
          <div className="bar-segment seg-fair" style={{ width: '20%' }}>
            <span className="seg-percent">20%</span>
          </div>
          <div className="bar-segment seg-improved" style={{ width: '10%' }}>
            <span className="seg-percent">10%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="metrics-legend">
          <span className="legend-item">
            <span className="legend-dot dot-blue" /> Excellent
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-lime" /> Good
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-dark" /> Fair
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-muted" /> Improved
          </span>
        </div>

        {/* Advice prompt footer */}
        <div className="metrics-footer-note">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>
            Highlight employees needing improvement with suggestions for training or mentoring
          </span>
        </div>
      </div>
    </div>
  );
}

export default MetricsRatingCard;

