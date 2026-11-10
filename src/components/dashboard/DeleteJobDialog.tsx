
"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Trash2Icon } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import type { JobListing } from "@/types";
import { deleteJob } from "@/lib/actions/jobs";

interface DeleteJobDialogProps {
    job: JobListing;
    onDeleted: (jobId: string) => void;
}

export function DeleteJobDialog({
    job,
    onDeleted,
}: DeleteJobDialogProps) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            const response = await deleteJob(job._id);

            if (response.deletedCount > 0) {
                onDeleted(job._id);
                setOpen(false);

                toast.add({
                    title: "Deleted job",
                    description: "The job has been deleted successfully.",
                });
            }

        } catch (error) {
            toast.add({
                title: "Delete failed",
                description: error instanceof Error
                    ? error.message
                    : "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button variant="destructive">
                        <Trash2Icon />
                    </Button>
                }
            />

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>

                    <AlertDialogTitle>
                        Delete job?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This will permanently delete this job posting.
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
