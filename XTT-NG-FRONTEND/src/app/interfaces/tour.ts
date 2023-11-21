export interface Tour {
    tourID:string,
    name:string,
    description:string,
    destination:string,
    price: number;
    type:string,
    startDate: number,
    endDate: number,
    duration: number
}


export interface TourBooking extends Tour {
    bookingID:string,
    userID: string;
    tourID: string;
    selectedID:string;
    bookingDate: string,
  }