export const getBookingStatus = (booking) => {
  if (!booking) {
    return "Unknown";
  }
  if (booking.status === "Cancelled") {
    return "Cancelled";
  }
  if (booking.status === "Completed") {
    return "Completed";
  }
  if (booking.returnDate) {
    const returnDate = new Date(booking.returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    returnDate.setHours(0, 0, 0, 0);
    if (
      returnDate < today &&
      booking.paymentStatus === "Paid"
    ) {
      return "Completed";
    }
  }
  if (booking.paymentStatus === "Paid") {
    return "Confirmed";
  }
  return "Pending Payment";
};
export const getBookingStatusClass = (
  status,
  prefix = "booking-status"
) => {
  switch (status) {
    case "Cancelled":
      return `${prefix}-cancelled`;
    case "Completed":
      return `${prefix}-completed`;
    case "Confirmed":
      return `${prefix}-confirmed`;
    case "Pending Payment":
      return `${prefix}-pending`;
    default:
      return `${prefix}-unknown`;
  }
};