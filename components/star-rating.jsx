import Image from "next/image";
export default function StarRaing({ rating }) {
  // rating ekta integer theke ekta array create kroe nei rating er soman length er
  const stars = new Array(rating).fill(0); // array take 0 dia fill kore dilam . mane proti ta porperty 0
  return (
    <>
      {stars.map((star, index) => (
        <Image
          key={index}
          src="/assets/star.svg"
          alt={`Star ${index + 1}`}
          width={24}
          height={24} // You can adjust the width and height as needed
        />
      ))}
    </>
  );
}
