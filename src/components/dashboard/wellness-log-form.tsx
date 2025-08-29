'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Sparkles } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { WellnessLog, WellnessLogFormValues } from '@/lib/types';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { addOrUpdateWellnessLog } from '@/actions/wellness-actions';
import { useToast } from '@/hooks/use-toast';

const logSchema = z.object({
  date: z.date({ required_error: 'A date is required.' }),
  sleepHours: z.coerce.number().min(0, 'Cannot be negative.').max(24, 'Cannot exceed 24.'),
  waterIntake: z.coerce.number().min(0, 'Cannot be negative.'),
  meals: z.string().min(1, 'Please describe your meals.'),
  mood: z.enum(['happy', 'neutral', 'sad', 'stressed']),
  steps: z.coerce.number().min(0, 'Cannot be negative.'),
});

type WellnessLogFormProps = {
  isOpen: boolean;
  onClose: () => void;
  log: WellnessLog | null;
};

export function WellnessLogForm({ isOpen, onClose, log }: WellnessLogFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<WellnessLogFormValues>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      date: new Date(),
      sleepHours: 8,
      waterIntake: 8,
      meals: '',
      mood: 'neutral',
      steps: 0,
    },
  });

  useEffect(() => {
    if (log) {
      form.reset({
        date: new Date(log.date),
        sleepHours: log.sleepHours,
        waterIntake: log.waterIntake,
        meals: log.meals,
        mood: log.mood,
        steps: log.steps,
      });
    } else {
      form.reset({
        date: new Date(),
        sleepHours: 8,
        waterIntake: 8,
        meals: '',
        mood: 'neutral',
        steps: 0,
      });
    }
  }, [log, form, isOpen]);

  const onSubmit = async (values: WellnessLogFormValues) => {
    setIsLoading(true);
    try {
      const result = await addOrUpdateWellnessLog(values, log?.id);
      toast({
        title: `Log ${log ? 'updated' : 'added'} successfully!`,
        description: result?.healthTip ? (
          <div className="flex items-start gap-2 pt-1">
            <Sparkles className="h-5 w-5 flex-shrink-0 text-primary" />
            <p className="font-medium">{result.healthTip}</p>
          </div>
        ) : undefined,
        duration: 9000,
      });
      onClose();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{log ? 'Edit' : 'Add'} Wellness Log</DialogTitle>
          <DialogDescription>
            {log ? "Update your daily wellness metrics." : "Log how you're feeling and doing today."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField control={form.control} name="sleepHours" render={({ field }) => (
                <FormItem><FormLabel>Sleep (hrs)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="waterIntake" render={({ field }) => (
                <FormItem><FormLabel>Water (glasses)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="steps" render={({ field }) => (
                <FormItem><FormLabel>Steps</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="mood" render={({ field }) => (
              <FormItem>
                <FormLabel>Mood</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="happy">Happy</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="sad">Sad</SelectItem>
                    <SelectItem value="stressed">Stressed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="meals" render={({ field }) => (
              <FormItem>
                <FormLabel>Meals</FormLabel>
                <FormControl><Textarea placeholder="Briefly describe your meals..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Log'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
