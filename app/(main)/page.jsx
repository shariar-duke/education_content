import Test from "@/components/Test";
import { getCourses } from "@/queries/courses";
export default async function Home() {

  const courses = await getCourses()
  console.log("The courses are ", courses)
  return (
    <div>
    <Test/>
    </div>
  );
}
