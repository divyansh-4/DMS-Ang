import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule,FormsModule,CommonModule,ButtonModule,ConfirmPopupModule],
  providers:[ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor(private confirmationService:ConfirmationService){

  }
  @Input() product!:Product; 
  @Output() edit:EventEmitter<Product>=new EventEmitter<Product>();
  @Output() delete:EventEmitter<Product>=new EventEmitter<Product>();
  @ViewChild('deleteButton') deleteButton:any ;
editProduct(){
  this.edit.emit(this.product);
}

deleteProduct(){
  this.delete.emit(this.product);
}

confirmDelete(){
  this.confirmationService.confirm({
    target:this.deleteButton.nativeElement,
    message:"Sure you want to Delete ?",
    accept:()=>{
      this.deleteProduct();
    },
  })
}

  // ngOnInit(){
  //   this.edit.emit(this.product);
  // }
}
