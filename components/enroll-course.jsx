import { Button, buttonVariants } from "@/components/ui/button"; // Check if this Button supports the used props
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
export const EnrollCourse = ({ asLink }) => {
  return (
    <>
      <form action="">
        {asLink ? (
          <Button
            variant="ghost"
            type="submit"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />{" "}
          </Button>
        ) : (
          <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};
