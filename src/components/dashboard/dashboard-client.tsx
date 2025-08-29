'use client';
import type { WellnessLog } from '@/lib/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { WellnessLogForm } from './wellness-log-form';
import { WellnessCharts } from './wellness-charts';
import { WellnessLogCard } from './wellness-log-card';
import { SuggestionCard } from './suggestion-card';
import { useAuth } from '@/hooks/use-auth';

type DashboardClientProps = {
  initialLogs: WellnessLog[];
  initialSuggestions: any;
};

export function DashboardClient({ initialLogs, initialSuggestions }: DashboardClientProps) {
  const [logs, setLogs] = useState<WellnessLog[]>(initialLogs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<WellnessLog | null>(null);
  const { userProfile } = useAuth();
  
  const handleOpenForm = (log?: WellnessLog) => {
    setSelectedLog(log || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedLog(null);
  };

  const hasTodayLog = logs.some(log => log.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hi, {userProfile?.name}!</h2>
          <p className="text-muted-foreground">Here's your wellness summary.</p>
        </div>
        <Button onClick={() => handleOpenForm()} disabled={hasTodayLog}>
          <PlusCircle className="mr-2 h-4 w-4" /> {hasTodayLog ? "Today's Log Added" : "Add Today's Log"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mb-6">
        <SuggestionCard suggestions={initialSuggestions} className="lg:col-span-3" />
      </div>

      <div className="mb-6">
        <WellnessCharts logs={logs} />
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">Your Recent Logs</h3>
        {logs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {logs.map((log) => (
              <WellnessLogCard key={log.id} log={log} onEdit={() => handleOpenForm(log)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">You haven't logged any wellness data yet.</p>
            <Button variant="link" onClick={() => handleOpenForm()}>Add your first log</Button>
          </div>
        )}
      </div>

      <WellnessLogForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        log={selectedLog}
      />
    </div>
  );
}
