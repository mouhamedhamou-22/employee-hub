import { useState, useMemo } from 'react';
import { Plus, Search, Filter, Calendar, Palmtree } from 'lucide-react';
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
import { vacations } from '@/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

const Vacations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const isMobile = useIsMobile();

  const filteredVacations = useMemo(() => {
    return vacations.filter((vacation) => {
      const matchesSearch = vacation.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || vacation.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || vacation.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const stats = useMemo(() => ({
    pending: vacations.filter(v => v.status === 'pending').length,
    approved: vacations.filter(v => v.status === 'approved').length,
    rejected: vacations.filter(v => v.status === 'rejected').length,
    totalDays: vacations.filter(v => v.status === 'approved').reduce((sum, v) => sum + v.days, 0),
  }), []);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title text-xl md:text-2xl">Vacations</h1>
          <p className="page-description text-sm md:text-base">Manage employee vacation requests and time off.</p>
        </div>
        <Button size="sm" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Vacation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-warning" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
              <p className="text-lg md:text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
              <Palmtree className="h-5 w-5 md:h-6 md:w-6 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Approved</p>
              <p className="text-lg md:text-2xl font-bold">{stats.approved}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Rejected</p>
              <p className="text-lg md:text-2xl font-bold">{stats.rejected}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-info" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Total Days</p>
              <p className="text-lg md:text-2xl font-bold">{stats.totalDays}</p>
            </div>
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="flex-1 min-w-[120px] sm:w-36 sm:flex-none">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="flex-1 min-w-[120px] sm:w-36 sm:flex-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile: Card View / Desktop: Table */}
      {isMobile ? (
        <div className="grid gap-3">
          {filteredVacations.map((vacation) => (
            <div key={vacation.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{vacation.employeeName}</p>
                <StatusBadge status={vacation.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{vacation.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Days</p>
                  <p className="font-medium">{vacation.days}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Start</p>
                  <p className="font-medium">{vacation.startDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">End</p>
                  <p className="font-medium">{vacation.endDate}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate">{vacation.reason}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden overflow-x-auto">
          <table className="data-table w-full table-fixed">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Days</th>
                <th className="hidden lg:table-cell">Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVacations.map((vacation) => (
                <tr key={vacation.id}>
                  <td className="font-medium">{vacation.employeeName}</td>
                  <td className="capitalize">{vacation.type}</td>
                  <td>{vacation.startDate}</td>
                  <td>{vacation.endDate}</td>
                  <td>{vacation.days}</td>
                  <td className="text-muted-foreground max-w-xs truncate hidden lg:table-cell">{vacation.reason}</td>
                  <td>
                    <StatusBadge status={vacation.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vacations;
