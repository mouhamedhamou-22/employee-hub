import { UserPlus, Clock, CreditCard, Palmtree } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: UserPlus, label: 'Add Employee', path: '/employees', color: 'text-info' },
  { icon: Clock, label: 'Add Attendance', path: '/attendance', color: 'text-success' },
  { icon: CreditCard, label: 'Add Payment', path: '/payments', color: 'text-warning' },
  { icon: Palmtree, label: 'Add Vacation', path: '/vacations', color: 'text-chart-4' },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className="quick-action-btn group"
        >
          <action.icon className={`h-6 w-6 ${action.color} transition-transform group-hover:scale-110`} />
          <span className="text-sm font-medium text-foreground">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
