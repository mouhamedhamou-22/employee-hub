import { useState, useMemo } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { AddEmployeeModal } from '@/components/employees/AddEmployeeModal';
import { employees as initialEmployees } from '@/data/mockData';

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState(initialEmployees);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.phone.includes(searchQuery);
      const matchesRole = roleFilter === 'all' || emp.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, searchQuery, roleFilter, statusFilter]);

  const handleDeactivate = (id: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, status: 'inactive' as const } : emp
    ));
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title text-xl md:text-2xl">Employees</h1>
          <p className="page-description text-sm md:text-base">Manage your team members and their information.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} size="sm" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 md:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="flex-1 min-w-[120px] sm:w-36 sm:flex-none">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="flex-1 min-w-[120px] sm:w-36 sm:flex-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filteredEmployees.length}</strong> of{' '}
          <strong className="text-foreground">{employees.length}</strong> employees
        </span>
      </div>

      {/* Table */}
      <EmployeeTable employees={filteredEmployees} onDeactivate={handleDeactivate} />

      {/* Add Modal */}
      <AddEmployeeModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onAdd={(newEmployee) => {
          setEmployees([...employees, { 
            ...newEmployee, 
            id: String(employees.length + 1),
            status: 'active',
            hireDate: new Date().toISOString().split('T')[0],
            settings: {
              dailyWorkHours: 8,
              hourPrice: 20,
              dayPrice: 160,
              monthPrice: 3200,
              extraHoursPrice: 28,
              autoAttendance: false,
            }
          }]);
        }}
      />
    </div>
  );
};

export default Employees;
