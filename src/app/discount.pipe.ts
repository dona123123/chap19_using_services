import { Pipe } from "@angular/core";
import { DiscountService } from "./discount.service";


@Pipe({
    name: "discount",
    pure: false
})
export class paDiscountPipe{
    
    constructor( private discount: DiscountService){}

    transform( price: number): number{
        return this.discount.applyDiscount(price);
    }
}