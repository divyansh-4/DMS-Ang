import { Component, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule,CommonModule,FormsModule,RatingModule,ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() display:boolean=false;
  @Input() header!:string;
  @Input() product:Product={
    name:'',
    image:'',
    price:'',
    rating:0,

  }; 
  @Output() displayChange=new EventEmitter<boolean>();
  @Output() confirm=new EventEmitter<Product>();
  // @Output() cancel=new EventEmitter<void>();

  
  
  onConfirm(){
    this.confirm.emit(this.product);
    this.display=false;
    this.displayChange.emit(this.display);
  }

  onCancel(){
    this.display=false;
    this.displayChange.emit(this.display);
  }
  

}
