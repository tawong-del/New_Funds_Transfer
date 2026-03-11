import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TranslocoHttpLoader } from './transloco-http-loader-storybook';

describe('storybook TranslocoHttpLoader', () => {
  let httpLoader: TranslocoHttpLoader;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    } as unknown as HttpClient;

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }],
    });

    httpLoader = TestBed.inject(TranslocoHttpLoader);
  });

  it('should request storybook translation assets', () => {
    httpLoader.getTranslation('en');

    expect(httpClient.get).toHaveBeenCalledWith('/assets/i18n/en.json');
  });

  it('should request storybook allspark translation assets', () => {
    httpLoader.getTranslation('allspark/en');

    expect(httpClient.get).toHaveBeenCalledWith('/assets/i18n/allspark/en.json');
  });
});
