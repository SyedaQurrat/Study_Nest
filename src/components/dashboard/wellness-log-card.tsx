'use client';
import type { WellnessLog } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Droplets, Utensils, Smile, Footprints, MoreVertical, Trash2, Edit, Meh, Frown, Annoyed } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { deleteWellnessLog } from "@/actions/wellness-actions";
import { useToast } from "@/hooks/use-toast";
import { useState, type ReactNode } from "react";

type WellnessLogCardProps = {
    log: WellnessLog;
    onEdit: () => void;
};

const moodIcons: Record<WellnessLog['mood'], ReactNode> = {
    happy: <Smile className="h-5 w-5 text-primary" />,
    neutral: <Meh className="h-5 w-5 text-muted-foreground" />,
    sad: <Frown className="h-5 w-5 text-accent" />,
    stressed: <Annoyed className="h-5 w-5 text-destructive" />,
};

export function WellnessLogCard({ log, onEdit }: WellnessLogCardProps) {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this log?")) return;
        setIsDeleting(true);
        try {
            await deleteWellnessLog(log.id);
            toast({ title: "Log deleted successfully." });
        } catch (error) {
            toast({ variant: "destructive", title: "Failed to delete log." });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-4">
                <div>
                    <CardTitle className="text-lg">{format(parseISO(log.date), 'MMMM d, yyyy')}</CardTitle>
                    <CardDescription>{format(parseISO(log.date), 'EEEE')}</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    <span>{log.sleepHours} hours sleep</span>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                    <span>{log.waterIntake} glasses water</span>
                </div>
                <div className="flex items-center gap-2">
                    <Footprints className="h-4 w-4 text-muted-foreground" />
                    <span>{log.steps.toLocaleString()} steps</span>
                </div>
                <div className="flex items-center gap-2">
                    {moodIcons[log.mood]}
                    <span className="capitalize">{log.mood}</span>
                </div>
                <div className="col-span-2 flex items-start gap-2 pt-2">
                    <Utensils className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="flex-1 text-muted-foreground">{log.meals}</p>
                </div>
            </CardContent>
        </Card>
    );
}
