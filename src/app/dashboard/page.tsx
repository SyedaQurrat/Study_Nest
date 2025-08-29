import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { getWellnessData, getAiSuggestions } from '@/actions/wellness-actions';
import { useAuth } from '@/hooks/use-auth';

export default async function DashboardPage() {
  // Although we are in a server component, we need to ensure firebase auth is initialized.
  // In a real app, we might pass the user from a higher-level server component or middleware.
  // For this structure, actions will rely on the client-side initialized Firebase auth instance.

  const initialLogs = await getWellnessData();
  const initialSuggestions = await getAiSuggestions();

  return <DashboardClient initialLogs={initialLogs} initialSuggestions={initialSuggestions} />;
}
