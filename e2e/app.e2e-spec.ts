import { EmergencyMapPage } from './app.po';

describe('emergency-map App', () => {
  let page: EmergencyMapPage;

  beforeEach(() => {
    page = new EmergencyMapPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
