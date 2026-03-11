import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class QKebabCasePipe {
    transform(value) {
        return value
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QKebabCasePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: QKebabCasePipe, isStandalone: true, name: "qKebabCase" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QKebabCasePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'qKebabCase',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { QKebabCasePipe };
//# sourceMappingURL=questrade-allspark-angular-components-core-pipes.mjs.map
