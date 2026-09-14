import cars from "../Data/Cars";

export const getCars = () => {
  const savedCars = localStorage.getItem("cargoCars");

  if (savedCars) {
    return JSON.parse(savedCars);
  }

  return cars;
};