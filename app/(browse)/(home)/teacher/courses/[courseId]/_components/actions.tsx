"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { $Enums, Course, Status } from "@prisma/client";

interface ActionsProps {
  initialData: Course
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
  status: $Enums.Status;
};

export const Actions = ({
  initialData,
  disabled,
  courseId,
  isPublished,
  status,
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false)
  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const onFinished = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/courses/${courseId}`, { status: Status.OVER });
      toast.success("Course marked as finished");
      setIsFinished(true)
      router.refresh()
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAge = (startsBy: Date) => {
    const startedBy = new Date(startsBy); // Ensure the input is a Date object
    const today = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = today.getTime() - startedBy.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const coursePeriod = initialData.startsBy ? calculateAge(new Date(initialData.startsBy)) : null;
  console.log(initialData.status)
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      {/* <Button>انهاء {coursePeriod}</Button> */}
      {coursePeriod! > 31 && !isPublished && (
        <>
          <ConfirmModal onConfirm={onFinished}>
            <Button
              onClick={onFinished}
              disabled={initialData.status === Status.OVER}
            >
              انهاء
            </Button>
          </ConfirmModal>
        </>
      )}
      {coursePeriod! * -1 > 3 ?
        <ConfirmModal onConfirm={onDelete}>
          <Button size="sm" disabled={isLoading || initialData.status === Status.OVER}>
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmModal>
:coursePeriod!*-1 < 0 && initialData.status !== Status.OVER? ' الدورة فعالة'
:coursePeriod!*-1 < 0 && initialData.status === Status.OVER? 'انتهت الدورة'

        : 'تبدأ بعد: ' + coursePeriod! * -1 + ' يوم '
      }
    </div>
  )
}