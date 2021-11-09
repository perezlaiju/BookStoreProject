export interface Coupon {
    Id: number,
    Code: string,
    DiscountPercentage: number,
    DiscountValue: number,
    MinOrderValue: number,
    IsClubbable: boolean,
    Status: string,
    CreatedAt: Date
}
