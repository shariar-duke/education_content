import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { FileQuestion, NotepadText, Radio, Video } from "lucide-react";
import CourseLessonList from "./CourseLessonList";
export default function CourseModuleList({ module }) {
  return (
    <>
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger>{module?.title}</AccordionTrigger>
        <AccordionContent>
          {/* header */}
          <div class="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
            <span className="flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              {(module?.duration / 60).toPrecision(2)} Hours
            </span>
            <span className="flex items-center gap-1.5">
              <NotepadText className="w-4 h-4" />
              {/* // egula apatopt static thak */}
              10 Notes
            </span>
            <span className="flex items-center gap-1.5">
              <FileQuestion className="w-4 h-4" />
              {/* // egula apatopt static thak */}
              10 Quiz
            </span>
            <span className="flex items-center gap-1.5">
              {/* // egula apatopt static thak */}
              <Radio className="w-4 h-4" />1 Live Class
            </span>
          </div>
          {/* header ends */}

          <div className="space-y-3">
            {/* item */}

            {module?.lessonIds &&
              module?.lessonIds.map((lessonId, index) => (
                <CourseLessonList key={index} lessonId={lessonId} />
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
