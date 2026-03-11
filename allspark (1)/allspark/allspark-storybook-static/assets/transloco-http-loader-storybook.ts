import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string): Observable<Translation> {
    const fullPathname = window.location.pathname ?? '/';
    const pathname = fullPathname.replace('iframe.html', '');
    const translationPath = `${pathname}assets/i18n/${lang}.json`;

    return this.http.get<Translation>(translationPath);
  }
}
