import {PluginCommonModule, Type, VendurePlugin} from '@vendure/core';

import {VERCEL_COMMERCE_PLUGIN_OPTIONS} from './constants';
import {PluginInitOptions} from './types';
import {ProductResolver} from './api/product.resolver';
import {shopApiExtensions} from './api/api-extensions';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [
        {
            provide: VERCEL_COMMERCE_PLUGIN_OPTIONS,
            useFactory: () => VercelCommercePlugin.options
        },
        ProductResolver
    ],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^3.0.0',
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [ProductResolver]
    },
})
export class VercelCommercePlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<VercelCommercePlugin> {
        this.options = options;
        return VercelCommercePlugin;
    }
}
