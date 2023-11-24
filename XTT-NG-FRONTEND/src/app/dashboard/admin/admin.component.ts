import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tour } from 'src/app/interfaces/tour';
import { User } from 'src/app/interfaces/user';
import { ModalCommunicationService } from 'src/app/services/modal-communication.service';
import { TourService } from 'src/app/services/tour.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  visible = true
  notVisible=false
  loggedIn=true

  createTourForm!: FormGroup
  tours!: Tour[];
  users!: User[];

  constructor(
    private tourService: TourService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private modalCommunicationService: ModalCommunicationService,
    private cdr: ChangeDetectorRef
  ) {
    this.createTourForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      price: ['', [Validators.required]],
      type: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      // duration: ['', []]
    }
      );
    
  }

//  ngOnInit(){
  
//  }

// dateValidators(control: AbstractControl) {
//   const startDate = control.get('startDate')?.value;
//   const endDate = control.get('endDate')?.value;

//   if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
//     control.get('endDate')?.setErrors({ endDateInvalid: true });
//   } else {
//     control.get('endDate')?.setErrors(null);
//   }

//   const currentDate = new Date();
//   console.log(currentDate);
  
//   if (startDate && new Date(startDate) < currentDate) {
//     control.get('startDate')?.setErrors({ startDateInvalid: true });
//   } else {
//     control.get('startDate')?.setErrors(null);
//   }

//   if (startDate && endDate && !control.hasError('endDateInvalid') && !control.hasError('startDateInvalid')) {
//     const startDateTime = new Date(startDate).getTime();
//     const endDateTime = new Date(endDate).getTime();
//     console.log(endDate);
    
//     const duration = Math.round((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));
//     console.log(duration);

//     control.get('duration')?.setValue(duration);
//   }
// }
// startDate!:number;

// endDate!:number;

  ngOnInit() {
    this.getTours();
    this.getUsers();



//     this.createTourForm.get('startDate')?.valueChanges.subscribe(res=>{
//       this.startDate = new Date(this.createTourForm.get('startDate')?.value).getTime()
//       console.log(this.startDate);
//       const duration = Math.round((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
//       console.log(duration);
  
//       this.createTourForm.get('duration')?.setValue(duration);
//     })

//     this.createTourForm.get('endDate')?.valueChanges.subscribe(res=>{
//       this.endDate = new Date(this.createTourForm.get('endDate')?.value).getTime()
//       console.log(this.endDate);

//       const duration = Math.round((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
//       console.log(duration);
  
//       this.createTourForm.get('duration')?.setValue(duration);
//     })

   

    
 }

  getTours() {
    this.tourService.getTours().subscribe(
      (response) => {
        this.tours = response;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

  createTour() {
    let createTour: Tour = this.createTourForm.value;
    this.tourService.createTour(createTour).subscribe(
      () => {
        // this.tours.push(createTour)
        this.getTours();
        this.loadTours();
        // console.log('Tours created successfully');
        // this.modalCommunicationService.notifyTourAdded();
        this.visible=true
        // this.cdr.detectChanges()
      },
      (error) => {
        console.error('Error creating tours:', error);
      }
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:',error.error.message);
      }
    );
  }

  loadTours(): void {
    this.tourService.getTours().subscribe(
      (tours) => {
        this.tours = tours;
        this.loadTours();
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );

    
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.loadUsers();
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

  deleteTour(tourID: string): void {
    alert('Are you sure You want to delete, this action is irreversible')
    this.tourService.deleteTour(tourID).subscribe(
      () => {
        this.loadTours();
      },
      (error) => {
        console.error('Error deleting Tour:', error);
      }
    );
  }


  deleteUser(userID: string): void {
    alert('Are you sure You want to delete, this action is irreversible')
    this.userService.deleteUser(userID).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting Tour:', error);
      }
    );
  }
}
