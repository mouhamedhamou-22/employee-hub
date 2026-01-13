import { Users, UserCheck, Clock, DollarSign, Palmtree } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { PayrollChart } from '@/components/dashboard/PayrollChart';
import { VacationChart } from '@/components/dashboard/VacationChart';
import { dashboardStats } from '@/data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <KPICard
          title="Total Employees"
          value={dashboardStats.totalEmployees}
          icon={Users}
          variant="default"
        />
        <KPICard
          title="Active Employees"
          value={dashboardStats.activeEmployees}
          icon={UserCheck}
          variant="success"
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Today Attendance"
          value={`${dashboardStats.todayAttendancePercent}%`}
          icon={Clock}
          variant="info"
        />
        <KPICard
          title="Monthly Payroll"
          value={`$${dashboardStats.monthlyPayrollTotal.toLocaleString()}`}
          icon={DollarSign}
          variant="warning"
        />
        <KPICard
          title="On Vacation"
          value={dashboardStats.employeesOnVacation}
          subtitle="employees today"
          icon={Palmtree}
          variant="info"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
        <QuickActions />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        <PayrollChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <VacationChart />
        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Vacation approved', detail: 'Robert Kim - 5 days', time: '2 hours ago' },
              { action: 'Payment processed', detail: 'January salaries - $28,120', time: '1 day ago' },
              { action: 'New employee added', detail: 'Lisa Martinez - Customer Service', time: '3 days ago' },
              { action: 'Attendance alert', detail: 'James Wilson marked absent', time: 'Today' },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-foreground">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
