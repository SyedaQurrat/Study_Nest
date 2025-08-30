import { CheckCircle2, XCircle } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const comparisonData = [
    { feature: 'AI-Powered Tutor', studynest: true, classroom: false, others: false },
    { feature: 'Digital Book Library', studynest: true, classroom: false, others: true },
    { feature: 'Assignment Management', studynest: true, classroom: true, others: true },
    { feature: 'Built-in Calculators', studynest: true, classroom: false, others: false },
    { feature: 'Pakistan Curriculum Focus', studynest: true, classroom: false, others: false },
    { feature: 'Cost', studynest: 'Freemium', classroom: 'Free', others: 'Varies' },
];

const Tick = () => <CheckCircle2 className="h-6 w-6 text-green-500" />;
const Cross = () => <XCircle className="h-6 w-6 text-red-500" />;

export function Comparison() {
  return (
    <section id="comparison" className="bg-muted py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How We Compare
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See why StudyNest is the ultimate, all-in-one platform for students in Pakistan.
          </p>
        </div>
        <div className="mt-12 overflow-x-auto">
          <Table className="min-w-full rounded-lg border bg-card shadow-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 font-semibold">Feature</TableHead>
                <TableHead className="text-center font-semibold">
                  <div className="flex items-center justify-center">
                    StudyNest
                    <Badge variant="default" className="ml-2">All-in-One</Badge>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold">Google Classroom</TableHead>
                <TableHead className="text-center font-semibold">Other Apps</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index} className="[&_td]:text-center">
                  <TableCell className="text-left font-medium">{row.feature}</TableCell>
                  <TableCell>
                    {typeof row.studynest === 'boolean' ? (row.studynest ? <Tick /> : <Cross />) : <span className="text-sm font-semibold">{row.studynest}</span>}
                  </TableCell>
                  <TableCell>
                     {typeof row.classroom === 'boolean' ? (row.classroom ? <Tick /> : <Cross />) : <span className="text-sm font-semibold">{row.classroom}</span>}
                  </TableCell>
                  <TableCell>
                     {typeof row.others === 'boolean' ? (row.others ? <Tick /> : <Cross />) : <span className="text-sm font-semibold">{row.others}</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
