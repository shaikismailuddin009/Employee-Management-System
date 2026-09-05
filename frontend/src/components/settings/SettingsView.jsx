import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export function SettingsView({ onRefreshData, companyName, setCompanyName }) {
  const [healthStatus, setHealthStatus] = useState('checking');
  const [latency, setLatency] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const checkHealth = async () => {
    setHealthStatus('checking');
    const start = performance.now();
    try {
      const res = await api.getHealth();
      const end = performance.now();
      if (res && res.status === 'healthy') {
        setHealthStatus('healthy');
        setLatency(Math.round(end - start));
        setLastChecked(new Date().toLocaleTimeString());
      } else {
        setHealthStatus('unhealthy');
      }
    } catch {
      setHealthStatus('unreachable');
      setLastChecked(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="settings-view-container">
      {/* Header */}
      <div className="view-header-row">
        <div>
          <div className="dashboard-eyebrow-line">
            <span>System</span>
            <span className="badge-pill-count">Configuration</span>
          </div>
          <h1 className="view-main-title">System Settings & Health</h1>
          <p className="view-subtitle">
            Manage application preferences, view FastAPI connectivity, and configure enterprise defaults
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Backend Connectivity Status Card */}
        <div className="card settings-card">
          <div className="card-header-clean">
            <div>
              <span className="card-eyebrow">Service Connection</span>
              <h3 className="card-title">FastAPI Backend Health</h3>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={checkHealth}
            >
              Re-test Ping
            </button>
          </div>

          <div className="settings-card-body">
            <div className="health-status-row">
              <span className="health-dot-indicator dot-online" />
              <div>
                <strong>
                  {healthStatus === 'healthy'
                    ? 'Connected & Operational'
                    : healthStatus === 'checking'
                    ? 'Pinging backend...'
                    : 'Service Unreachable'}
                </strong>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Target: <code>http://127.0.0.1:8000/health</code>
                </p>
              </div>
            </div>

            <div className="system-meta-grid">
              <div className="sys-meta-item">
                <span className="sys-lbl">API Latency:</span>
                <strong>{latency !== null ? `${latency} ms` : '—'}</strong>
              </div>
              <div className="sys-meta-item">
                <span className="sys-lbl">Last Heartbeat:</span>
                <strong>{lastChecked || 'Just now'}</strong>
              </div>
              <div className="sys-meta-item">
                <span className="sys-lbl">Backend Framework:</span>
                <strong>FastAPI (Python)</strong>
              </div>
              <div className="sys-meta-item">
                <span className="sys-lbl">Database Engine:</span>
                <strong>SQLite (employee.db)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Company Profile Preferences */}
        <div className="card settings-card">
          <div className="card-header-clean">
            <div>
              <span className="card-eyebrow">Enterprise Identity</span>
              <h3 className="card-title">Company Profile</h3>
            </div>
          </div>

          <div className="settings-card-body">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Company / Organization Name</label>
              <input
                type="text"
                className="form-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enterprise Inc."
              />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Currency Symbol</label>
              <select className="form-input" defaultValue="INR">
                <option value="INR">₹ INR (Indian Rupee)</option>
                <option value="USD">$ USD (US Dollar)</option>
                <option value="EUR">€ EUR (Euro)</option>
                <option value="GBP">£ GBP (British Pound)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Default Employment Type</label>
              <select className="form-input" defaultValue="Permanent">
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Synchronization Controls */}
        <div className="card settings-card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header-clean">
            <div>
              <span className="card-eyebrow">Sync & Cache</span>
              <h3 className="card-title">Data Management</h3>
            </div>
          </div>

          <div className="settings-card-body">
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
              Force refresh the local application state with the live FastAPI backend database.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onRefreshData}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Refresh All Data from Database</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;

