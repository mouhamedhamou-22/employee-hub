import { FileText, Download, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const reportTypes = [
  { id: 'payroll', name: 'Payroll Report', description: 'Monthly salary, bonuses, and deductions', icon: DollarSign },
  { id: 'attendance', name: 'Attendance Report', description: 'Daily attendance tracking and summaries', icon: Clock },
  { id: 'employee', name: 'Employee Report', description: 'Employee details and status overview', icon: Users },
  { id: 'performance', name: 'Performance Report', description: 'Productivity and performance metrics', icon: TrendingUp },
];

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="page-title">Reports</h1>
        <p className="page-description">Generate and export various reports for your organization.</p>
      </div>

      {/* Report Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {reportTypes.map((report) => (
          <div 
            key={report.id}
            className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <report.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Select defaultValue="january">
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January 2026</SelectItem>
                      <SelectItem value="december">December 2025</SelectItem>
                      <SelectItem value="november">November 2025</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Payroll Report - December 2025', date: '2026-01-02', format: 'PDF' },
            { name: 'Attendance Summary - Week 52', date: '2025-12-30', format: 'Excel' },
            { name: 'Employee Overview Q4 2025', date: '2025-12-28', format: 'PDF' },
          ].map((report, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">Generated on {report.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
