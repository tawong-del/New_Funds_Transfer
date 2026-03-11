import { TRANSLOCO_MISSING_HANDLER, TranslocoMissingHandler } from '@jsverse/transloco';
import { en } from './languages';

const normalizeKey = (key: string): string => {
  if (key.includes('allspark')) {
    const split = key.split(/allspark[^.]*\./);

    return split[1] ?? split[0];
  }

  return key;
};

const getTranslationByKey = (key: string): string => {
  const normalizedKey = normalizeKey(key);
  const keySplit = normalizedKey.split('.');
  let objectTranslation: object = en;

  for (const keyAttribute of keySplit) {
    const translation = objectTranslation[keyAttribute as keyof typeof objectTranslation];
    if (translation !== undefined) {
      objectTranslation = translation;
    } else {
      return key;
    }
  }

  if (typeof objectTranslation === 'string') {
    return objectTranslation;
  }

  return key;
};

export class CustomHandler implements TranslocoMissingHandler {
  handle(key: string): string {
    return getTranslationByKey(key);
  }
}

export const MISSING_KEY_HANDLER = {
  provide: TRANSLOCO_MISSING_HANDLER,
  useClass: CustomHandler,
};
