import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { HomeService } from '../service/home.service';
import { AuthService } from '../../auth/service/auth.service';
import { Payload } from 'src/app/models/payload.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  loadProduct: Subscription;
  userId: string = '';

  data: Product[] = [];
  displayedColumns: string[] = ['prod_name', 'prod_description', 'prod_category', 'prod_price', 'prod_status', 'actions'];

  constructor(private homeService: HomeService, private authService: AuthService, private fb: FormBuilder) {
    this.loadProduct = new Subscription();
    this.authService.getCurrentUser().subscribe((user: Payload) =>{
      console.log(user);
      
      this.userId = user.userId
    })
  }
  
  mySearch: FormGroup = this.fb.group({
    search: [''],
    type: [''],
  })


  options: any[] = [
    {value: 'Producto', viewValue: 'Producto'},
    {value: 'Categoria', viewValue: 'Categoria'}
  ];

  ngOnInit() {
    this.loadDataSearch()
    
  }


  loadDataSearch() {
    const {search, type} = this.mySearch.value
    console.log(search);
    console.log(type);
    
    
    if (this.userId) {
      this.loadProduct = this.homeService.searchProduct(this.userId, search, type).subscribe((result: any) =>{
        if(result.data){
          this.data = result.data;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if(this.loadProduct){
      this.loadProduct.unsubscribe();
    }
  }

}
