import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AIChatComponent } from './components/ai-chat/ai-chat.component';



@NgModule({
  declarations: [
    AIChatComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    AIChatComponent
  ]
})
export class AIAssistantModule { }
