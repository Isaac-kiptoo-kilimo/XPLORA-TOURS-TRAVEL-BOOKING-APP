export interface User{
    userID:string,
    fullName:string,
    email:string,
    password:string,
    role:string
}

export interface Tour{
    tourID:string,
    name:string,
    description:string,
    destination:string,
    price: number;
    type:string,
    startDate:string,
    endDate:string
}

export interface TourBooking {
    bookingID:string,
    userId: string;
    tourId: string;
    bookingDate: string,
  }
  
 export interface TourReviewInput {
    userId: string;
    tourId: string;
    rating: number;
    comment: string;
  }
  
  export interface updateUser{
      userID:string,
      fullName:string,
      email:string    
  }