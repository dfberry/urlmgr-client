import { UrlmgrClientNg4Page } from './app.po';

describe('urlmgr-client-ng4 App', () => {
  let page: UrlmgrClientNg4Page;

  beforeEach(() => {
    page = new UrlmgrClientNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
