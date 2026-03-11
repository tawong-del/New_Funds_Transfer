import * as _jsverse_transloco from '@jsverse/transloco';
import { Translation, TranslocoMissingHandler, TranslocoTestingOptions, TranslocoTestingModule } from '@jsverse/transloco';
import * as _angular_core from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

declare const SUPPORTED_LANGUAGES: {
    code: string;
    icon: string;
    title: string;
}[];
declare const DEFAULT_LANGUAGE: {
    code: string;
    icon: string;
    title: string;
};

declare const mergeTranslations: (translation: Translation, custom: Translation) => Translation;

declare class CustomHandler implements TranslocoMissingHandler {
    handle(key: string): string;
}
declare const MISSING_KEY_HANDLER: {
    provide: _angular_core.InjectionToken<_jsverse_transloco.TranslocoMissingHandlerData>;
    useClass: typeof CustomHandler;
};

declare const ALLSPARK_SCOPE_NAME = "allspark";
declare const ALLSPARK_SCOPE: {
    provide: _angular_core.InjectionToken<_jsverse_transloco.TranslocoScope>;
    useValue: string;
};

declare function getTranslocoModule(options?: TranslocoTestingOptions): ModuleWithProviders<TranslocoTestingModule>;

export { ALLSPARK_SCOPE, ALLSPARK_SCOPE_NAME, CustomHandler, DEFAULT_LANGUAGE, MISSING_KEY_HANDLER, SUPPORTED_LANGUAGES, getTranslocoModule, mergeTranslations };
