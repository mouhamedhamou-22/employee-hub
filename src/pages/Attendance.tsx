import { useState, useMemo } from 'react';
import { Plus, Search, Filter, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusBadge } from '@/components/ui/status-badge';
import { Badge } from '@/components/ui/badge';
import { attendanceRecords, employees } from '@/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddAttendanceDrawer } from '@/components/attendance/AddAttendanceDrawer';

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('2026-01-13');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const isMobile = useIsMobile();

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = !dateFilter || record.date === dateFilter;
      const matchesType = typeFilter === 'all' || record.type === typeFilter;
      return matchesSearch && matchesDate && matchesType;
    });
  }, [searchQuery, dateFilter, typeFilter]);

  const todayStats = useMemo(() => {
    const todayRecords = attendanceRecords.filter(r => r.date === '2026-01-13');
    return {
      present: todayRecords.filter(r => r.type === 'present').length,
      late: todayRecords.filter(r => r.type === 'late').length,
      absent: todayRecords.filter(r => r.type === 'absent').length,
      vacation: todayRecords.filter(r => r.type === 'vacation').length,
    };
  }, []);

  const handleAddAttendance = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="page-title text-xl md:text-2xl">Attendance</h1>
          <p className="page-description text-sm md:text-base">Track and manage employee attendance records.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Mark All </span>Present
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none" onClick={handleAddAttendance}>
            <Plus className="mr-2 h-4 w-4" />
            Add<span className="hidden sm:inline"> Attendance</span>
          </Button>
        </div>
      </div>

      {/* Today Stats */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-3 md:p-4 flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-success/10 flex items-center justify-center shrink-0">
            <span className="text-base md:text-lg font-bold text-success">{todayStats.present}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground">Present</p>
            <p className="font-semibold text-sm md:text-base">Today</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 md:p-4 flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
            <span className="text-base md:text-lg font-bold text-warning">{todayStats.late}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground">Late</p>
            <p className="font-semibold text-sm md:text-base">Today</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 md:p-4 flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <span className="text-base md:text-lg font-bold text-destructive">{todayStats.absent}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground">Absent</p>
            <p className="font-semibold text-sm md:text-base">Today</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 md:p-4 flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-info/10 flex items-center justify-center shrink-0">
            <span className="text-base md:text-lg font-bold text-info">{todayStats.vacation}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground">Vacation</p>
            <p className="font-semibold text-sm md:text-base">Today</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 md:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by employee name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[140px]">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="flex-1 min-w-[120px] sm:w-36 sm:flex-none">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="vacation">Vacation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile: Card View / Desktop: Table */}
      {isMobile ? (
        <div className="grid gap-3">
          {filteredRecords.map((record) => (
            <div key={record.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{record.employeeName}</p>
                <StatusBadge status={record.type} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{record.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hours</p>
                  <p className="font-medium">{record.workedHours > 0 ? `${record.workedHours}h` : '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Entry</p>
                  <p className="font-medium">{record.entryTime || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Exit</p>
                  <p className="font-medium">{record.exitTime || '-'}</p>
                </div>
              </div>
              {record.isAuto && (
                <Badge variant="outline" className="text-xs">Auto Attendance</Badge>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden overflow-x-auto">
          <table className="data-table w-full table-fixed">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th className="hidden lg:table-cell">Entry Time</th>
                <th className="hidden lg:table-cell">Exit Time</th>
                <th>Worked Hours</th>
                <th>Type</th>
                <th className="hidden md:table-cell">Auto</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td className="font-medium">{record.employeeName}</td>
                  <td>{record.date}</td>
                  <td className="hidden lg:table-cell">{record.entryTime || '-'}</td>
                  <td className="hidden lg:table-cell">{record.exitTime || '-'}</td>
                  <td>{record.workedHours > 0 ? `${record.workedHours}h` : '-'}</td>
                  <td>
                    <StatusBadge status={record.type} />
                  </td>
                  <td className="hidden md:table-cell">
                    {record.isAuto && (
                      <Badge variant="outline" className="text-xs">Auto</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Attendance Drawer */}
      <AddAttendanceDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default Attendance;
