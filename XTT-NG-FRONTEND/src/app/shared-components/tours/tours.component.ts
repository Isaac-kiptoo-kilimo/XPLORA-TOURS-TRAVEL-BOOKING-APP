import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/interfaces/tour';
import { User } from 'src/app/interfaces/user';
import { TourService } from 'src/app/services/tour.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  visible = true;
  loggedIn: boolean = false;

  tours!: Tour[];
  users!: User[];
  tour !: Tour
  tourID: string=''

  updateTourID :string =''

  // tour!:any
 
  // visible = true

  updateTourForm!: FormGroup
 
 

  constructor(private tourService: TourService, private router: Router, private userService:UsersService,private cdr: ChangeDetectorRef , private formBuilder:FormBuilder, private route:ActivatedRoute ){
    this.updateTourForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      price: ['', [Validators.required]],
      type: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });

  }
 
 getTour(){

    this.route.params.subscribe(params=>{
      this.tourID = params['tourID']

      this.tourService.getSingleTour(this.tourID).subscribe(
        (tour: any) => {
          console.log(tour);
          this.tour = tour;
        },
        (error) => {
          console.error('Error fetching tour details:', error);
        }
      );
    })


  }

  clickUpdateTourID = (tourID:string)=> {
    this.updateTourID = tourID

    console.log(this.updateTourID);
    
  }

  updateTour() {
    if (this.updateTourForm.invalid) {
    
      return;
    }
  
    if (!this.tour || !this.updateTourID) {
      
      console.error('Invalid tour or tourID');
      return;
    }
  
    let updatedTour: Tour = this.updateTourForm.value;
     this.tourID= this.updateTourID;
  
    console.log(updatedTour);
  
    this.tourService.updateTourById(this.tourID, updatedTour).subscribe(
      (response) => {
        console.log('Tour updated successfully', response);
        this.updateTourForm.reset();
      },
      (error) => {
        console.error('Error updating tour', error);
      }
    );
  }
  
  ngOnInit() {
    this.getTours();
    this.getUsers();
    this.getTour()
    // this.getTourDetails()
    
  }


  getTours() {
    this.tourService.getTours().subscribe(
      (response) => {
        this.tours= response;
        this.cdr.detectChanges()
        this.loadTours
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }




  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }




  loadTours(): void {
    this.tourService.getTours().subscribe(
      (tours) => {
        this.tours = tours;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }


  deleteTour(tourID: string): void {
    alert('Are you sure You want to delete,this action is irreversible')
    this.tourService.deleteTour(tourID).subscribe(
      () => {
        this.loadTours();
      },
      (error) => {
        console.error('Error deleting Tour:', error);
      }
    );
  }


  logout() {
    this.router.navigate(['']);
    localStorage.clear();
    this.loggedIn = false;
  }

}





  
