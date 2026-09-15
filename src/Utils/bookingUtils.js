export const isCarAvailable = (
  carId,
  pickupDate,
  returnDate
) => {
  const savedBookings =
    JSON.parse(localStorage.getItem("cargoBookings")) || [];
  const requestedPickup = new Date(pickupDate);
  const requestedReturn = new Date(returnDate);
  const conflictingBooking = savedBookings.find((booking) => {
    // Ignore cancelled bookings
    if (booking.status === "Cancelled") {
      return false;
    }
    // Check whether this is the same car
    if (Number(booking.carId) !== Number(carId)) {
      return false;
    }
    const existingPickup = new Date(booking.pickupDate);
    const existingReturn = new Date(booking.returnDate);
    // Check date overlap
    return (
      requestedPickup < existingReturn &&
      requestedReturn > existingPickup
    );
  });
  return !conflictingBooking;
};