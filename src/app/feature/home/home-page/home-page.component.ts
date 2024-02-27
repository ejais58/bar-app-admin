import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  loadRooms: Subscription

  data: Product[] = [];
  displayedColumns: string[] = ['prod_name', 'prod_description', 'prod_category', 'prod_price', 'prod_status', 'actions'];

  constructor(private homeService: HomeService) {
    this.loadRooms = new Subscription();
  }
  
  options: any[] = [
    {value: 'product-1', viewValue: 'Producto'},
    {value: 'category-1', viewValue: 'Categoria'}
  ];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadRooms = this.homeService.allProducts().subscribe((result: any) =>{
      if(result.data){

        console.log(result);
        
        this.data = result.data;
        
        
      }
    })
  }

  ngOnDestroy(): void {
    if (this.loadRooms){
      this.loadRooms.unsubscribe();
    }
  }

}
