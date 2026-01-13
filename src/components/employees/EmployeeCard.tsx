import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, UserX, MoreHorizontal } from 'lucide-react';
import { Employee } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface EmployeeCardProps {
  employee: Employee;
  onDeactivate?: (id: string) => void;
}

export function EmployeeCard({ employee, onDeactivate }: EmployeeCardProps) {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatSalaryType = (type: string) => {
    const labels: Record<string, string> = {
      hour: 'Hourly',
      day: 'Daily',
      month: 'Monthly',
    };
    return labels[type] || type;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(employee.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{employee.fullName}</p>
            <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/employees/${employee.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            {employee.status === 'active' && onDeactivate && (
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDeactivate(employee.id)}
              >
                <UserX className="mr-2 h-4 w-4" />
                Deactivate
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted-foreground">Role</p>
          <p className="font-medium capitalize">{employee.role}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Status</p>
          <StatusBadge status={employee.status} />
        </div>
        <div>
          <p className="text-muted-foreground">Phone</p>
          <p className="font-medium">{employee.phone}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Salary</p>
          <p className="font-medium">{formatSalaryType(employee.salaryType)}</p>
        </div>
      </div>

      {/* Actions */}
      <Button 
        className="w-full" 
        variant="outline"
        onClick={() => navigate(`/employees/${employee.id}`)}
      >
        <Eye className="mr-2 h-4 w-4" />
        View Details
      </Button>
    </div>
  );
}
