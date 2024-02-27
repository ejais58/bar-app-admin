import { Category } from "./category.interface";

export interface Product {
    prod_name: string;
    prod_description: string;
    id_category: Category;
    id_client: string;
    prod_price: number;
    prod_is_active: string;
}