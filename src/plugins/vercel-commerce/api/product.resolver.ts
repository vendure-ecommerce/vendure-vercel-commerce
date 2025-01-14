import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {Ctx, Product, ProductVariantService, RequestContext} from '@vendure/core';

@Resolver('Product')
export class ProductResolver {
    constructor(private readonly productVariantService: ProductVariantService) {
    }

    @ResolveField()
    async priceRange(@Ctx() ctx: RequestContext, @Parent() product: Product) {
        // TODO: Improve with caching
        const variants = await this.productVariantService.getVariantsByProductId(ctx, product.id);
        const prices = variants.items.map(v => v.priceWithTax).sort();

        return {
            min: prices.at(0),
            max: prices.at(prices.length - 1)
        }
    }
}
