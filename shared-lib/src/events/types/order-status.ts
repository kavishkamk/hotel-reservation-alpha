export enum ReservationStatus {
    // when the reservation is created,
    // but the reservation for the order is still not reserved
    Created = "created",

    // the reservation, try to reserved for the reservation is already reserved
    // when the user cancelled the reservation
    // when the reservation expired
    Cancelled = "cancelled",

    // reservation is successfully reserved for the order 
    AwaitingPayment = "awaiting:payment",

    // payment is successfully compleated and reservation is reserved
    Complete = "complete"
};