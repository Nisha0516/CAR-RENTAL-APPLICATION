import { useState } from "react";

const cars = [
  { id: 1, name: "Tesla Model S", image: "https://source.unsplash.com/800x400/?tesla,car" },
  { id: 2, name: "BMW M3", image: "https://source.unsplash.com/800x400/?bmw,car" },
  { id: 3, name: "Audi A6", image: "https://source.unsplash.com/800x400/?audi,car" },
];

const CarCarousel = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? cars.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === cars.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8">
      <img
        src={cars[current].image}
        alt={cars[current].name}
        className="w-full h-72 object-cover rounded-xl shadow-lg"
      />
      <h2 className="text-center mt-3 text-xl font-semibold">{cars[current].name}</h2>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 bg-gray-800 text-white p-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 bg-gray-800 text-white p-2 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};

export default CarCarousel;
