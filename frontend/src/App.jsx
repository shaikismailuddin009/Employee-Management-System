import React, { useState, useEffect, useCallback } from 'react';
import api from './services/api';
import Navbar from './components/common/Navbar';
import Toast from './components/common/Toast';
import ConfirmModal from './components/common/ConfirmModal';
import DashboardView from './components/dashboard/DashboardView';
import EmployeesView from './components/employees/EmployeesView';
import EmployeeFormModal from './components/employees/EmployeeFormModal';
import DepartmentsView from './components/departments/DepartmentsView';
import ReportsView from './components/reports/ReportsView';
import SettingsView from './components/settings/SettingsView';
import './App.css';

export function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');

  // Core Data State
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentReports, setDepartmentReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Settings preferences
  const [companyName, setCompanyName] = useState('Enterprise EMS');

  // Notification Toast State
  const [toast, setToast] = useState(null);

  // Form Modal State (Create / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formApiError, setFormApiError] = useState(null);

  // Delete Confirmation Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Fetch all essential backend data
   */
  const loadAllData = useCallback(async () => {
    try {
      const [statsData, empData, deptData, deptReportData] = await Promise.all([
        api.getDashboardStats().catch((err) => {
          console.error('Stats error:', err);
          return null;
        }),
        api.getEmployees().catch((err) => {
          console.error('Employees error:', err);
          return [];
        }),
        api.getDepartments().catch((err) => {
          console.error('Departments error:', err);
          return [];
        }),
        api.getDepartmentReports().catch((err) => {
          console.error('Dept reports error:', err);
          return { departments: [] };
        }),
      ]);

      if (statsData) setStats(statsData);
      if (empData) setEmployees(empData);
      if (deptData) setDepartments(deptData);
      if (deptReportData?.departments) setDepartmentReports(deptReportData.departments);
    } catch (err) {
      console.error('Failed to load application data:', err);
      setToast({
        type: 'error',
        message: 'Could not connect to FastAPI backend. Ensure server is running at http://127.0.0.1:8000',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Handle Global Search change
  const handleSearchChange = (query) => {
    setGlobalSearch(query);
    if (query && activeTab !== 'employees') {
      setActiveTab('employees');
    }
  };

  // Open Create Employee Modal
  const handleOpenCreateModal = () => {
    setEditingEmployee(null);
    setFormApiError(null);
    setIsFormOpen(true);
  };

  // Open Edit Employee Modal
  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
    setFormApiError(null);
    setIsFormOpen(true);
  };

  // Close Form Modal
  const handleCloseFormModal = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
    setFormApiError(null);
  };

  // Handle Form Submit (Create or Edit)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setFormApiError(null);

    try {
      if (editingEmployee && editingEmployee.id) {
        // Edit existing employee
        await api.updateEmployee(editingEmployee.id, formData);
        setToast({
          type: 'success',
          message: `Employee ${formData.first_name} ${formData.last_name} updated successfully!`,
        });
      } else {
        // Create new employee
        await api.createEmployee(formData);
        setToast({
          type: 'success',
          message: `Employee ${formData.first_name} ${formData.last_name} created successfully!`,
        });
      }

      handleCloseFormModal();
      await loadAllData();
    } catch (err) {
      console.error('Save employee error:', err);
      setFormApiError(err.message || 'Failed to save employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (emp) => {
    setEmployeeToDelete(emp);
    setIsDeleteOpen(true);
  };

  // Close Delete Confirmation Modal
  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(false);
    setEmployeeToDelete(null);
  };

  // Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    setIsDeleting(true);

    try {
      await api.deleteEmployee(employeeToDelete.id);
      setToast({
        type: 'success',
        message: `Employee ${employeeToDelete.first_name} ${employeeToDelete.last_name} deleted successfully!`,
      });
      handleCloseDeleteModal();
      await loadAllData();
    } catch (err) {
      console.error('Delete employee error:', err);
      setToast({
        type: 'error',
        message: err.message || 'Failed to delete employee.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Navigate from departments or charts into employee table
  const handleFilterByDepartment = (deptName) => {
    setActiveTab('employees');
    setGlobalSearch(deptName === 'All' ? '' : deptName);
  };

  return (
    <div className="app-layout">
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Elevated Dashboard Container */}
      <div className="main-content-canvas">
        {/* Top Header & Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          searchQuery={globalSearch}
          onSearchChange={handleSearchChange}
          onAddEmployeeClick={handleOpenCreateModal}
        />

        {/* Dynamic Content Views */}
        <main className="view-content-area">
          {isLoading ? (
            <div className="loading-screen-wrap">
              <div className="spinner" />
              <p>Connecting to Employee Management API...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  stats={stats}
                  departments={departments}
                  employees={employees}
                  onNavigate={setActiveTab}
                  onAddEmployeeClick={handleOpenCreateModal}
                  onSelectEmployee={handleOpenEditModal}
                />
              )}

              {activeTab === 'employees' && (
                <EmployeesView
                  employees={employees}
                  departments={departments}
                  onAddEmployeeClick={handleOpenCreateModal}
                  onEditEmployee={handleOpenEditModal}
                  onDeleteEmployee={handleOpenDeleteModal}
                  searchQuery={globalSearch}
                />
              )}

              {activeTab === 'departments' && (
                <DepartmentsView
                  departments={departments}
                  departmentReports={departmentReports}
                  employees={employees}
                  onNavigateToEmployees={handleFilterByDepartment}
                  onAddEmployeeToDept={handleOpenCreateModal}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsView
                  employees={employees}
                  departments={departments}
                  departmentReports={departmentReports}
                  stats={stats}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  onRefreshData={loadAllData}
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Add / Edit Employee Modal */}
      <EmployeeFormModal
        isOpen={isFormOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        employee={editingEmployee}
        departments={departments}
        isLoading={isSubmitting}
        apiError={formApiError}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={
          employeeToDelete
            ? `Are you sure you want to delete ${employeeToDelete.first_name} ${employeeToDelete.last_name} (${employeeToDelete.employee_id})? This action cannot be undone.`
            : 'Are you sure you want to delete this employee?'
        }
        confirmLabel="Delete Employee"
        isDanger={true}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default App;
