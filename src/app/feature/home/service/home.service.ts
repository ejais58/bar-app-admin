import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  base_url: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  allProducts(){
    return this.httpClient.get(`${this.base_url}/product/all/65daa0e091f55b4d529734c5`);
  }
}
