import { SolidcommentsPage } from './app.po';

describe('solidcomments App', function() {
  let page: SolidcommentsPage;

  beforeEach(() => {
    page = new SolidcommentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
