import { createReducer, on } from "@ngrx/store"
import { addShopData, deleteShopData } from "./shop.action"

export interface DataState {
    data: ReadonlyArray<any>
}

const initialSate = [{
    Quantity: 1,
    id: "1",
    name: "Mens Jacket",
    offer_price: '$699',
    photo: "./assets/images/products/10.png",
    price:'$999'
},
{
  Quantity: 2,
  id: "8",
  name: "Soft Toy",
  offer_price: '$345',
  photo:  "./assets/images/products/3.png",
  price:'$499'
}
]

export const dataReaducer = createReducer(
    initialSate,
    on(addShopData, (state, {data}) => {
        console.log("Form Add")
        return [...state,data[0]]
    }),
    on(deleteShopData, (state, {id}) =>{
        const updatedPosts = state.filter(post =>{
            return post.id !== id
        })
        return state=updatedPosts
    })
)
