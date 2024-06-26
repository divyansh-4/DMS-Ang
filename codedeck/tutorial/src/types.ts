import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options{
    headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        context?: HttpContext;
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
}

export interface Products{
    items: Product[];
      total: number;
      page:number;
      perPage:number;
      totalPages: number;
}

export interface Product{
    id?:number;
    image:string;
    name:string;
    price:string;
    rating:number;
    info:string;
}
export interface CartProducts {
  items: CartProduct[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
export interface CartProduct {
  cartId?: number;
  prodId:number;
  userId:number;
  image: string;
  name: string;
  price: string;
  rating: number;
  info: string;
  qty:number;
}

export interface PaginationParams{
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    page:number;
    perPage:number;
}