import { ModuleWithProviders } from '@angular/core';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { en, fr } from './languages';

export function getTranslocoModule(
  options: TranslocoTestingOptions = {},
): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: { en, fr, 'allspark/en': en, 'allspark/fr': fr },
    translocoConfig: {
      availableLangs: ['en', 'fr'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
