import { vacationUsageData } from '@/data/mockData';

export function VacationChart() {
  const total = vacationUsageData.reduce((acc, curr) => acc + curr.value, 0);
  const usedPercentage = (vacationUsageData[0].value / total) * 100;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Vacation Usage</h3>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Circular Progress */}
        <div className="relative h-40 w-40">
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--chart-1))"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${usedPercentage * 4.4} 440`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{Math.round(usedPercentage)}%</span>
            <span className="text-sm text-muted-foreground">Used</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6">
          {vacationUsageData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}: {item.value} days
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
