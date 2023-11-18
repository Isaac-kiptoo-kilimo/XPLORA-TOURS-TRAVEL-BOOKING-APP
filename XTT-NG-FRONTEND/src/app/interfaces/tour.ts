export interface Tour {
    tourID:string,
    name:string,
    description:string,
    destination:string,
    price: number;
    type:string,
    startDate:string,
    endDate:string,
    duration:string
}


export interface TourBooking extends Tour {
    bookingID:string,
    userId: string;
    tourId: string;
    bookingDate: string,
  }