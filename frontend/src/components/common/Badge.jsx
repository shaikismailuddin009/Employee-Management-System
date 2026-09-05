import React from 'react';

export function StatusBadge({ status }) {
  const normalized = (status || 'Active').toLowerCase();
  
  let className = 'badge-active';
  let label = status || 'Active';

  if (normalized === 'probation') {
    className = 'badge-probation';
  } else if (normalized === 'pending') {
    className = 'badge-pending';
  } else if (normalized === 'inactive' || normalized === 'terminated') {
    className = 'badge-inactive';
  }

  return (
    <span className={`status-badge ${className}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}

export function TypeBadge({ type }) {
  const normalized = (type || 'Permanent').toLowerCase();
  let className = 'badge-type-permanent';
  
  if (normalized === 'contract') {
    className = 'badge-type-contract';
  } else if (normalized === 'part-time') {
    className = 'badge-type-parttime';
  }

  return (
    <span className={`type-badge ${className}`}>
      {type || 'Permanent'}
    </span>
  );
}

export function RatingBadge({ rating, showLabel = true }) {
  const num = Number(rating) || 0;
  let label = 'Fair';
  let colorClass = 'rating-fair';

  if (num >= 8.5) {
    label = 'Excellent';
    colorClass = 'rating-excellent';
  } else if (num >= 7.0) {
    label = 'Good';
    colorClass = 'rating-good';
  } else if (num >= 6.0) {
    label = 'Average';
    colorClass = 'rating-average';
  } else {
    label = 'Needs Improvement';
    colorClass = 'rating-low';
  }

  return (
    <span className={`rating-badge ${colorClass}`}>
      <span className="rating-star">★</span>
      <span className="rating-score">{num.toFixed(1)}</span>
      {showLabel && <span className="rating-label">{label}</span>}
    </span>
  );
}

