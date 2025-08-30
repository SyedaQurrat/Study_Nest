
'use client';

import { useForm, zodResolver, z } from '@/lib/form-helpers';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile } from '@/actions/user-actions';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const profileFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  classLevel: z.enum(['6th', '7th', '8th', 'University']),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      classLevel: '6th',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name,
        classLevel: userProfile.classLevel,
      });
    }
  }, [userProfile, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to update your profile.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUserProfile(user.uid, data);
      toast({
        title: 'Success!',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Failed to update profile. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (authLoading) {
      return (
          <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-72 mb-8" />
              <Card>
                  <CardHeader>
                      <Skeleton className="h-6 w-32 mb-1" />
                      <Skeleton className="h-4 w-64" />
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                       <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <Skeleton className="h-10 w-32" />
                  </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and class level.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your name and class level to get relevant course materials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your class level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="6th">6th Grade</SelectItem>
                        <SelectItem value="7th">7th Grade</SelectItem>
                        <SelectItem value="8th">8th Grade</SelectItem>
                        <SelectItem value="University">University</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
