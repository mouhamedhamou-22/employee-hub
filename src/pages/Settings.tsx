import { useState } from 'react';
import { Clock, CreditCard, Palmtree, Shield, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { attendanceTypes, paymentTypes, vacationTypes, roles } from '@/data/mockData';

const Settings = () => {
  const { toast } = useToast();
  const [workSettings, setWorkSettings] = useState({
    entryTime: '09:00',
    exitTime: '17:00',
    breakDuration: 60,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [newItem, setNewItem] = useState('');

  const handleSaveWorkSettings = () => {
    toast({
      title: 'Settings saved',
      description: 'Work hours settings have been updated.',
    });
  };

  const handleAddItem = () => {
    toast({
      title: 'Item added',
      description: `New ${currentCategory} has been added successfully.`,
    });
    setShowAddModal(false);
    setNewItem('');
  };

  const handleDeleteItem = () => {
    toast({
      title: 'Item deleted',
      description: `${currentCategory} has been deleted.`,
    });
    setShowDeleteModal(false);
  };

  const SettingsList = ({ items, category }: { items: string[]; category: string }) => (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
        >
          <span>{item}</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => {
                setCurrentCategory(category);
                setShowDeleteModal(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => {
          setCurrentCategory(category);
          setShowAddModal(true);
        }}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add {category}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Configure system settings and preferences.</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="work-hours" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="work-hours" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Work Hours</span>
          </TabsTrigger>
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
        </TabsList>

        <TabsContent value="work-hours">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-6">Work Hours Settings</h3>
            <div className="grid gap-6 sm:grid-cols-3 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="entryTime">Entry Time</Label>
                <Input
                  id="entryTime"
                  type="time"
                  value={workSettings.entryTime}
                  onChange={(e) => setWorkSettings({ ...workSettings, entryTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exitTime">Exit Time</Label>
                <Input
                  id="exitTime"
                  type="time"
                  value={workSettings.exitTime}
                  onChange={(e) => setWorkSettings({ ...workSettings, exitTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breakDuration">Break Duration (min)</Label>
                <Input
                  id="breakDuration"
                  type="number"
                  value={workSettings.breakDuration}
                  onChange={(e) => setWorkSettings({ ...workSettings, breakDuration: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={handleSaveWorkSettings}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-6">Attendance Types</h3>
            <SettingsList items={attendanceTypes} category="Attendance Type" />
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-6">Payment Types</h3>
            <SettingsList items={paymentTypes} category="Payment Type" />
          </div>
        </TabsContent>

        <TabsContent value="vacations">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-6">Vacation Types</h3>
            <SettingsList items={vacationTypes} category="Vacation Type" />
          </div>
        </TabsContent>
      </Tabs>

      {/* Roles & Permissions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Roles & Permissions</h3>
        </div>
        <SettingsList items={roles} category="Role" />
      </div>

      {/* Add Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {currentCategory}</DialogTitle>
            <DialogDescription>
              Enter a name for the new {currentCategory.toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="newItem">Name</Label>
            <Input
              id="newItem"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Enter ${currentCategory.toLowerCase()} name`}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {currentCategory}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {currentCategory.toLowerCase()}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteItem}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
