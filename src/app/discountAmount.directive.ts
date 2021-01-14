import { ChangeDetectorRef, Directive, Input, KeyValueDiffer,KeyValueDiffers, SimpleChange } from "@angular/core";
import { DiscountService } from "./discount.service";

@Directive({
    selector: "td[pa-price]",
    exportAs: "discount1"  // whole PaDiscountAmountDirective instance
})
export class PaDiscountAmountDirective{
    private differ:   KeyValueDiffer<any, any>;

    constructor( private keyValueDiffers: KeyValueDiffers,
                 private changeDetector: ChangeDetectorRef,
                 private discount: DiscountService){}

    @Input("pa-price")
    originalPrice: number;

    discountAmount: number;

    ngOnInit(){
        this.differ = this.keyValueDiffers.find(this.discount).create();
    }
    ngOnChanges( changes: { [property: string]: SimpleChange}){
        if( changes["originalPrice"] != null ){
            this.updateValue();
        }
    }
    ngDoCheck(){
        if( this .differ.diff( this.discount) != null){
            this.updateValue();
        }
    }
    private updateValue(){
        this.discountAmount = this.originalPrice - this.discount.applyDiscount( this.originalPrice);
    }

}