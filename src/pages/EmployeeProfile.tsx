import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CreditCard, Palmtree, Settings, Mail, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/status-badge';
import { employees, attendanceRecords, payments, vacations } from '@/data/mockData';
import { EmployeeAttendanceTab } from '@/components/employee-profile/AttendanceTab';
import { EmployeePaymentsTab } from '@/components/employee-profile/PaymentsTab';
import { EmployeeVacationsTab } from '@/components/employee-profile/VacationsTab';
import { EmployeeSettingsTab } from '@/components/employee-profile/SettingsTab';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const employee = employees.find(e => e.id === id);
  
  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Employee not found</h2>
        <Button variant="link" onClick={() => navigate('/employees')}>
          Go back to employees
        </Button>
      </div>
    );
  }

  const employeeAttendance = attendanceRecords.filter(a => a.employeeId === id);
  const employeePayments = payments.filter(p => p.employeeId === id);
  const employeeVacations = vacations.filter(v => v.employeeId === id);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/employees')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Employees
      </Button>

      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials(employee.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{employee.fullName}</h1>
                <StatusBadge status={employee.status} />
              </div>
              <p className="text-muted-foreground">{employee.jobTitle}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {employee.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {employee.department}
                </span>
              </div>
              <p className="text-sm">
                <span className="text-muted-foreground">Role: </span>
                <span className="capitalize font-medium">{employee.role}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Add Attendance
            </Button>
            <Button variant="outline" size="sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
            <Button variant="outline" size="sm">
              <Palmtree className="mr-2 h-4 w-4" />
              Add Vacation
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="attendance" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="vacations" className="gap-2">
            <Palmtree className="h-4 w-4" />
            <span className="hidden sm:inline">Vacations</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <EmployeeAttendanceTab records={employeeAttendance} />
        </TabsContent>
        <TabsContent value="payments">
          <EmployeePaymentsTab payments={employeePayments} />
        </TabsContent>
        <TabsContent value="vacations">
          <EmployeeVacationsTab vacations={employeeVacations} />
        </TabsContent>
        <TabsContent value="settings">
          <EmployeeSettingsTab employee={employee} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeProfile;
