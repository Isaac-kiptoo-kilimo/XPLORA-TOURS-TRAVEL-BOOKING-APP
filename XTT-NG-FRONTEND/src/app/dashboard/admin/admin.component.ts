import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class AdminComponent {
  visible = true
  notVisible=false
  loggedIn=true

  createTourForm!: FormGroup
  // isFormVisible: boolean = false; 
  tours!: Tour[];
  users!: User[];
  // visible = true
 

  constructor(private tourService: TourService, private formBuilder:FormBuilder,private router: Router, private userService:UsersService,private modalCommunicationService: ModalCommunicationService,private cdr: ChangeDetectorRef ){

    this.createTourForm=this.formBuilder.group({
      name:['',[Validators.required]], 
      description: ['',[Validators.required]],
      destination: ['',[Validators.required]],
      price: ['',[Validators.required]],
      type: ['',[Validators.required]],
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
      duration:['',[Validators.required]],
    })

  }

  ngOnInit() {
    this.getTours();
    this.getUsers();
    
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
        this.tours.push(createTour)
        this.getTours();
        // this.router.navigate(['admin']);
        console.log('Tours created successfully');
        this.modalCommunicationService.notifyTourAdded();
        this.visible=true
        this.cdr.detectChanges()
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

  
}
