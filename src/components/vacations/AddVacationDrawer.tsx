import { useState, useEffect, useMemo } from 'react';
import { format, differenceInDays, parseISO } from 'date-fns';
import { Palmtree, AlertCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Employee, vacations } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface AddVacationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  onSuccess?: () => void;
}

const vacationTypes = [
  { value: 'annual', label: 'Annual Leave', paid: true },
  { value: 'sick', label: 'Sick Leave', paid: true },
  { value: 'personal', label: 'Personal Leave', paid: true },
  { value: 'unpaid', label: 'Unpaid Leave', paid: false },
  { value: 'maternity', label: 'Maternity/Paternity', paid: true },
];

// Mock: Each employee has 21 annual leave days per year
const ANNUAL_LEAVE_ALLOWANCE = 21;

export function AddVacationDrawer({
  open,
  onOpenChange,
  employee,
  onSuccess,
}: AddVacationDrawerProps) {
  const [vacationType, setVacationType] = useState('annual');
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [reason, setReason] = useState('');
  const [totalDays, setTotalDays] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate total days when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const days = differenceInDays(end, start) + 1;
      setTotalDays(Math.max(1, days));
    }
  }, [startDate, endDate]);

  // Calculate vacation usage for the employee
  const vacationUsage = useMemo(() => {
    if (!employee) return null;

    const employeeVacations = vacations.filter(
      v => v.employeeId === employee.id && v.status === 'approved' && v.type === 'annual'
    );
    
    const usedDays = employeeVacations.reduce((sum, v) => sum + v.days, 0);
    const remainingDays = ANNUAL_LEAVE_ALLOWANCE - usedDays;
    const usagePercentage = (usedDays / ANNUAL_LEAVE_ALLOWANCE) * 100;

    return {
      allowance: ANNUAL_LEAVE_ALLOWANCE,
      used: usedDays,
      remaining: remainingDays,
      usagePercentage: Math.min(100, usagePercentage),
    };
  }, [employee]);

  const isUnpaid = vacationType === 'unpaid';
  const exceedsLimit = vacationUsage && vacationType === 'annual' && totalDays > vacationUsage.remaining;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (startDate && endDate && parseISO(endDate) < parseISO(startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    if (exceedsLimit) {
      newErrors.days = `Requested ${totalDays} days exceeds remaining balance of ${vacationUsage?.remaining} days`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: 'Vacation Request Submitted',
      description: `${totalDays} day(s) of ${vacationType} leave has been requested.`,
    });
    
    // Reset form
    setVacationType('annual');
    setStartDate(format(new Date(), 'yyyy-MM-dd'));
    setEndDate(format(new Date(), 'yyyy-MM-dd'));
    setReason('');
    setErrors({});
    
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Palmtree className="h-5 w-5" />
            Add Vacation
          </SheetTitle>
          <SheetDescription>
            Request vacation for {employee?.fullName || 'the selected employee'}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Employee Info */}
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <Label className="text-xs text-muted-foreground">Employee</Label>
            <p className="font-semibold">{employee?.fullName || 'Not selected'}</p>
            <p className="text-sm text-muted-foreground">{employee?.jobTitle}</p>
          </div>

          {/* Vacation Usage Progress */}
          {vacationUsage && (
            <div className="rounded-lg border border-border p-4 space-y-3">
              <Label className="text-xs text-muted-foreground">Annual Leave Balance</Label>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold">{vacationUsage.remaining}</span>
                  <span className="text-muted-foreground ml-1">days remaining</span>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{vacationUsage.used} / {vacationUsage.allowance} used</p>
                </div>
              </div>
              <Progress 
                value={vacationUsage.usagePercentage} 
                className={cn(
                  'h-3',
                  vacationUsage.remaining < 5 && '[&>div]:bg-warning',
                  vacationUsage.remaining === 0 && '[&>div]:bg-destructive'
                )}
              />
              {vacationUsage.remaining < 5 && vacationUsage.remaining > 0 && (
                <p className="text-sm text-warning flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Low vacation balance
                </p>
              )}
            </div>
          )}

          {/* Form Fields */}
          <div className="grid gap-4">
            {/* Vacation Type */}
            <div className="space-y-2">
              <Label>Vacation Type</Label>
              <Select value={vacationType} onValueChange={setVacationType}>
                <SelectTrigger className={cn(isUnpaid && 'border-warning bg-warning/5')}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {vacationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.label}
                        {!type.paid && (
                          <Badge variant="outline" className="text-xs">Unpaid</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isUnpaid && (
                <p className="text-sm text-warning flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  This leave type is unpaid
                </p>
              )}
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={errors.startDate ? 'border-destructive' : ''}
                />
                {errors.startDate && (
                  <p className="text-sm text-destructive">{errors.startDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={errors.endDate ? 'border-destructive' : ''}
                />
                {errors.endDate && (
                  <p className="text-sm text-destructive">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Total Days Display */}
            <div className="space-y-2">
              <Label>Total Days</Label>
              <div className={cn(
                'flex items-center justify-center p-4 rounded-lg border',
                exceedsLimit ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/50'
              )}>
                <span className={cn(
                  'text-4xl font-bold',
                  exceedsLimit && 'text-destructive'
                )}>
                  {totalDays}
                </span>
                <span className="text-muted-foreground ml-2">day{totalDays !== 1 ? 's' : ''}</span>
              </div>
              {errors.days && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.days}
                </p>
              )}
              {exceedsLimit && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Exceeds remaining vacation balance
                </p>
              )}
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for vacation..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className={errors.reason ? 'border-destructive' : ''}
                rows={3}
              />
              {errors.reason && (
                <p className="text-sm text-destructive">{errors.reason}</p>
              )}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8 flex gap-3">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || exceedsLimit}
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
