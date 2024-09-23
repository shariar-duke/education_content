"use client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function Test() {

  const handleClick =(mode) => {
    mode ? toast.success("Test success") : toast.error("Test error")
  }
  return (

      <Button onClick={()=> handleClick(false)}>Test Toast</Button>

  );
}
