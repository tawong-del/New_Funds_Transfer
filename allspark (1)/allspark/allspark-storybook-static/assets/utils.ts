import { Translation } from '@jsverse/transloco';

export const mergeTranslations = (translation: Translation, custom: Translation): Translation => {
  const result: Translation = translation;

  Object.keys(custom).forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (translation.hasOwnProperty(key)) {
      if (typeof translation[key] === 'string' || typeof translation[key] === 'number') {
        result[key] = custom[key];
      } else if (typeof translation[key] === 'object') {
        result[key] = mergeTranslations(translation[key], custom[key]);
      }
    }
  });

  return result;
};
