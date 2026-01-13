import { useState } from 'react';
import { Employee } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface SettingsTabProps {
  employee: Employee;
}

export function EmployeeSettingsTab({ employee }: SettingsTabProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState(employee.settings);
  const [isActive, setIsActive] = useState(employee.status === 'active');

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Employee settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Work Settings */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-6">Work Settings</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="dailyHours">Daily Work Hours</Label>
            <Input
              id="dailyHours"
              type="number"
              value={settings.dailyWorkHours}
              onChange={(e) => setSettings({ ...settings, dailyWorkHours: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourPrice">Hour Price ($)</Label>
            <Input
              id="hourPrice"
              type="number"
              value={settings.hourPrice}
              onChange={(e) => setSettings({ ...settings, hourPrice: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dayPrice">Day Price ($)</Label>
            <Input
              id="dayPrice"
              type="number"
              value={settings.dayPrice}
              onChange={(e) => setSettings({ ...settings, dayPrice: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthPrice">Month Price ($)</Label>
            <Input
              id="monthPrice"
              type="number"
              value={settings.monthPrice}
              onChange={(e) => setSettings({ ...settings, monthPrice: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="extraPrice">Extra Hours Price ($)</Label>
            <Input
              id="extraPrice"
              type="number"
              value={settings.extraHoursPrice}
              onChange={(e) => setSettings({ ...settings, extraHoursPrice: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* Auto Attendance */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Auto Attendance</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Automatically record attendance based on clock-in system
            </p>
          </div>
          <Switch
            checked={settings.autoAttendance}
            onCheckedChange={(checked) => setSettings({ ...settings, autoAttendance: checked })}
          />
        </div>
      </div>

      {/* Employee Status */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Employee Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isActive 
                ? 'This employee is currently active and can log in' 
                : 'This employee is deactivated and cannot log in'}
            </p>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
