import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})


export class ContactComponent implements OnInit {
  locationData: any;
  isLocationLoading = false;

  contactForm! : FormGroup;
  

constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {

     this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [this.phoneValidator]],
      email: ['', [Validators.required, Validators.email]],
      contactMode: ['call', Validators.required], // default selected
      terms: [false, Validators.requiredTrue]
    });
    
  }

  get f() {
  return this.contactForm.controls;
}

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  getLocationDetails(): void {
    if(this.locationData) {
      return; // Location data already fetched, no need to fetch again
    }
  this.isLocationLoading = true;
  this.http.get('http://ip-api.com/json').subscribe({
    next: (data) => {
      this.locationData = data;
      this.isLocationLoading = false;
    },
    error: () => {
      this.isLocationLoading = false;
      alert('Failed to get location details');
    },
  });
}

phoneValidator(control: AbstractControl): ValidationErrors | null { 
  const value = control.value;
  const isValid = /^[0-9]{10}$/.test(value);
  return isValid ? null : { invalidPhone: true };
}

}
