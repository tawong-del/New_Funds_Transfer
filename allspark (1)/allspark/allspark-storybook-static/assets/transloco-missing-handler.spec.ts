import { CustomHandler } from './transloco-missing-handler';

jest.mock('./languages', () => ({
  en: {
    page1: {
      title: 'Page 1 Title',
      form: { label: 'Form Label' },
    },
  },
}));

describe('custom TranslocoMissingHandler', () => {
  it('should return correct translation', () => {
    const handler = new CustomHandler();
    const result = handler.handle('page1.title');
    expect(result).toBe('Page 1 Title');
  });

  it("should return key if doesn't find translation", () => {
    const handler = new CustomHandler();
    const result = handler.handle('page1.description');
    expect(result).toBe('page1.description');
  });

  it('should return correct translation in allspark scope', () => {
    const handler = new CustomHandler();
    const result = handler.handle('allspark.page1.title');
    expect(result).toBe('Page 1 Title');
  });

  it('should return correct translation in allspark EN scope', () => {
    const handler = new CustomHandler();
    const result = handler.handle('allsparkEn.page1.title');
    expect(result).toBe('Page 1 Title');
  });

  it('should return key if translation path is not complete', () => {
    const handler = new CustomHandler();
    const result = handler.handle('page1.form');
    expect(result).toBe('page1.form');
  });

  it('should return key when its just allspark', () => {
    const handler = new CustomHandler();
    const result = handler.handle('allspark');
    expect(result).toBe('allspark');
  });
});
