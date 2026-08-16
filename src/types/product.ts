export interface Product{
    name:string;
    priceCents:number;
    image:string;
    rating:{
        stars:number;
        count:number;
    };
    stock:number;
    keywords:string[];
    id:string;
}