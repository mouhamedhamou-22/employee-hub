import { useState, useMemo } from 'react';
import { Plus, Search, Filter, Download, DollarSign } from 'lucide-react';
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
import { payments } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const isMobile = useIsMobile();

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = payment.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || payment.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    const januaryPayments = payments.filter(p => p.date.startsWith('2026-01'));
    return {
      totalSalaries: januaryPayments.filter(p => p.type === 'salary').reduce((sum, p) => sum + p.amount, 0),
      totalBonuses: januaryPayments.filter(p => p.type === 'bonus').reduce((sum, p) => sum + p.amount, 0),
      totalDeductions: januaryPayments.filter(p => p.type === 'deduction').reduce((sum, p) => sum + Math.abs(p.amount), 0),
      pendingAmount: januaryPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    };
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="page-title text-xl md:text-2xl">Payments</h1>
          <p className="page-description text-sm md:text-base">Manage payroll, bonuses, and deductions.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            Add<span className="hidden sm:inline"> Payment</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Salaries</p>
              <p className="text-lg md:text-2xl font-bold truncate">${stats.totalSalaries.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-info" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Bonuses</p>
              <p className="text-lg md:text-2xl font-bold truncate">${stats.totalBonuses.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-warning" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Deductions</p>
              <p className="text-lg md:text-2xl font-bold truncate">${stats.totalDeductions.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
              <p className="text-lg md:text-2xl font-bold truncate">${stats.pendingAmount.toLocaleString()}</p>
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
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="bonus">Bonus</SelectItem>
              <SelectItem value="deduction">Deduction</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="flex-1 min-w-[120px] sm:w-36 sm:flex-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile: Card View / Desktop: Table */}
      {isMobile ? (
        <div className="grid gap-3">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{payment.employeeName}</p>
                <StatusBadge status={payment.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground capitalize">{payment.type}</span>
                <span className={cn(
                  'text-lg font-bold',
                  payment.type === 'deduction' ? 'text-destructive' : 'text-success'
                )}>
                  {payment.type === 'deduction' ? '-' : '+'}${Math.abs(payment.amount).toLocaleString()}
                </span>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">{payment.date}</p>
                <p className="text-muted-foreground truncate">{payment.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th className="hidden lg:table-cell">Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="font-medium">{payment.employeeName}</td>
                  <td>{payment.date}</td>
                  <td className={cn(
                    'font-semibold',
                    payment.type === 'deduction' ? 'text-destructive' : 'text-success'
                  )}>
                    {payment.type === 'deduction' ? '-' : '+'}${Math.abs(payment.amount).toLocaleString()}
                  </td>
                  <td className="capitalize">{payment.type}</td>
                  <td className="text-muted-foreground hidden lg:table-cell">{payment.description}</td>
                  <td>
                    <StatusBadge status={payment.status} />
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

export default Payments;
