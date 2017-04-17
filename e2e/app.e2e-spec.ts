import { FlightSchoolPage } from './app.po';

describe('flight-school App', () => {
  let page: FlightSchoolPage;

  beforeEach(() => {
    page = new FlightSchoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
