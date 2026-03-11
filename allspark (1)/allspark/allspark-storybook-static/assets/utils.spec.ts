import { mergeTranslations } from './utils';

describe('utils', () => {
  const translationDefault = {
    page1: {
      text1: 'Text 1',
      text2: 'Text 2',
      form: {
        label: 'Form label',
      },
    },
    page2: {
      title: 'Page 2 Title',
      description: 'Page 2 description',
      section1: {
        title: 'Section 1 title',
      },
    },
    page3: {
      title: 'Page 3 Title',
      description: 'Page 3 description',
    },
  };

  const custom = {
    page1: {
      form: {
        label: 'My form custom label',
      },
    },
    page2: {
      title: 'Page 2 custom title',
    },
  };

  it('should merge translations correctly', () => {
    const result = mergeTranslations(translationDefault, custom);
    const expected = {
      page1: {
        text1: 'Text 1',
        text2: 'Text 2',
        form: {
          label: 'My form custom label',
        },
      },
      page2: {
        title: 'Page 2 custom title',
        description: 'Page 2 description',
        section1: {
          title: 'Section 1 title',
        },
      },
      page3: {
        title: 'Page 3 Title',
        description: 'Page 3 description',
      },
    };

    expect(result).toStrictEqual(expected);
  });
});
