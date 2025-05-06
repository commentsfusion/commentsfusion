// next.config.mjs
import { resolve } from 'path';

export const experimental = {
    externalDir: true,
};
export function webpack(config) {
    // (Optional) also add a nice alias so you never need ../../../
    config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@backend': resolve(__dirname, 'backend'),
    };
    return config;
}
