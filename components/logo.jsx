import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({ className = "" }) => {
  return (
    <Image
      className={cn("max-w-[100px]", className)}
      src="/lws_logo.svg" // Accessing the logo from the public folder
      alt="logo"
      width={100} // You can specify width and height for better optimization
      height={100}
    />
  );
};
