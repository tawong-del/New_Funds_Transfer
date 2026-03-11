import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslocoModule, provideTransloco } from '@jsverse/transloco';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './supported-languages';
import { TranslocoHttpLoader } from './transloco-http-loader-storybook';

/**
 * This module provides translations for Storybook.
 */
@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: SUPPORTED_LANGUAGES.map((l) => l.code),
        defaultLang: DEFAULT_LANGUAGE.code,
        reRenderOnLangChange: true,
        missingHandler: { logMissingKey: false },
        fallbackLang: DEFAULT_LANGUAGE.code,
        prodMode: false,
      },
      loader: TranslocoHttpLoader,
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class TranslocoStorybookModule {}
