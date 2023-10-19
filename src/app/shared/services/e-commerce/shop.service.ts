import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  // minusQuantity(id: any) {
  //   throw new Error('Method not implemented.');
  // }

  constructor() { }

allData =[{
  id: "1",
  name: "Mens Jacket",
  offer_price: "$699",
  photo: "./assets/images/products/10.png",
  price: "$19,799",
  Quantity: 1
}]

  gettingData(data:any){
    this.allData.push(...data)
    return data
  }

  retunData(){
    return this.allData
  }

  addingQuantity(id:any){
    this.allData[0].Quantity++
  }

  decreaseQuantity(id:any){
    if(this.allData[0].Quantity > 0){
      this.allData[0].Quantity--
    }
  }

  delectItem(id:any){
    var data = this.allData.filter(x =>{
      return x.id != id
    })
    this.allData = data
  }

  getPosta(){
    
    return []
  }

}
