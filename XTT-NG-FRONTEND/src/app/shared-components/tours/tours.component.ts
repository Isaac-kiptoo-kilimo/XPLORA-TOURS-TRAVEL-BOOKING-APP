import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  // visible = true

  updateTourForm!: FormGroup
 
 

  constructor(private tourService: TourService, private router: Router, private userService:UsersService,private cdr: ChangeDetectorRef , private formBuilder:FormBuilder ){
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
 
  // updateTour(){
  //   let updatedTour: Tour = this.updateTourForm.value;
  //   // updatedUser.userID = this.userID
  //      console.log(updatedUser);
       
  //      this.tourService.updateTourById(tourID, updatedTour)subscribe(
  //     (response) => {
  //       console.log(response);
        
  //       console.log('Tour updated successfully', response);
  //       this.updateTourForm.reset();
  //       // this.isFormVisible = false;
  //     },
  //     (error) => {
  //       console.error('Error updating user', error);
  //     }
  //   );
  // }

  ngOnInit() {
    this.getTours();
    this.getUsers();
    
  }


  getTours() {
    this.tourService.getTours().subscribe(
      (response) => {
        this.tours = response;
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





  
