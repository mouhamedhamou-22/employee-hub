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

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('2026-01-13');
  const [typeFilter, setTypeFilter] = useState<string>('all');

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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-description">Track and manage employee attendance records.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All Present
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Attendance
          </Button>
        </div>
      </div>

      {/* Today Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
            <span className="text-lg font-bold text-success">{todayStats.present}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Present</p>
            <p className="font-semibold">Today</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
            <span className="text-lg font-bold text-warning">{todayStats.late}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Late</p>
            <p className="font-semibold">Today</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-lg font-bold text-destructive">{todayStats.absent}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Absent</p>
            <p className="font-semibold">Today</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-info/10 flex items-center justify-center">
            <span className="text-lg font-bold text-info">{todayStats.vacation}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Vacation</p>
            <p className="font-semibold">Today</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by employee name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 w-44"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-36">
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

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Worked Hours</th>
              <th>Type</th>
              <th>Auto</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="font-medium">{record.employeeName}</td>
                <td>{record.date}</td>
                <td>{record.entryTime || '-'}</td>
                <td>{record.exitTime || '-'}</td>
                <td>{record.workedHours > 0 ? `${record.workedHours}h` : '-'}</td>
                <td>
                  <StatusBadge status={record.type} />
                </td>
                <td>
                  {record.isAuto && (
                    <Badge variant="outline" className="text-xs">Auto</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
