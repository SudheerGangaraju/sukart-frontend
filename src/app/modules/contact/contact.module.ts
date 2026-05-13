import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { NoopAnimationPlayer } from '@angular/animations';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule, 
    ContactRoutingModule, 
    ReactiveFormsModule,  
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule
  ],
})
export class ContactModule {}
