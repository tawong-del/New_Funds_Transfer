import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './supported-languages';

describe('Supported Languages', () => {
  it('should have 2 supported languages', () => {
    expect(SUPPORTED_LANGUAGES.length).toBe(2);
    expect(SUPPORTED_LANGUAGES[0].code).toBe('en');
    expect(SUPPORTED_LANGUAGES[1].code).toBe('fr');
  });

  it('default language should be EN', () => {
    expect(DEFAULT_LANGUAGE.code).toBe('en');
  });
});
