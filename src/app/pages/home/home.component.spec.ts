import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AdvertiseCardComponent } from '../../components/advertise-card/advertise-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, AdvertiseCardComponent, SearchBarComponent, SliderComponent, RouterTestingModule.withRoutes([])],
      providers: [
        provideHttpClient(),
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: { params: {} } 
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search bar', () => {
    const searchBarElement = fixture.debugElement.query(By.css('app-search-bar'));
    expect(searchBarElement).toBeTruthy();
  });

  it('should render the "Qui sommes-nous ?" section', () => {
    const qsmSection = fixture.debugElement.query(By.css('.bg-white'));
    expect(qsmSection).toBeTruthy();
    expect(qsmSection.nativeElement.textContent).toContain('Qui sommes-nous ?');
  });

  it('should render the advertise cards', () => {
    component.advertises = [
      {id: 5, title: 'skibidi', price: 166, adresse: {city: 'lyon', streetName: 'zola', adresseNumber: 46, country: 'france', postalCode: 64111}, presentationPicture: 'string', advertiseImages: [{advertise: 'string', imageSlug: 'string'}], totalPlaceNumber: 1, ActualNumberPlace: 1, reactions: [{note: 1}], disponibilitieDates: [{startedAt: 'string', endedAt: 'string', advertise: 'string'}], reservations: [{startedAt: 'string', endAt: 'string', user: {lastname: 'string'}}], services: [{name: 'string', advertise: 'string'}]},
      {id: 6, title: 'bop', price: 200, adresse: {city: 'paris', streetName: 'rue', adresseNumber: 1, country: 'france', postalCode: 75001}, presentationPicture: 'string', advertiseImages: [{advertise: 'string', imageSlug: 'string'}], totalPlaceNumber: 2, ActualNumberPlace: 2, reactions: [{note: 2}], disponibilitieDates: [{startedAt: 'string', endedAt: 'string', advertise: 'string'}], reservations: [{startedAt: 'string', endAt: 'string', user: {lastname: 'string'}}], services: [{name: 'string', advertise: 'string'}]},
   ];
    fixture.detectChanges();
    const advertiseCards = fixture.debugElement.queryAll(By.css('app-advertise-card'));
    expect(advertiseCards.length).toBe(2);
  });

  it('should render the slider', () => {
    const sliderElement = fixture.debugElement.query(By.css('app-slider'));
    expect(sliderElement).toBeTruthy();
  });

  it('should render the accordion', () => {
    const accordionElement = fixture.debugElement.query(By.css('#accordion-open'));
    expect(accordionElement).toBeTruthy();
  });

  it('should call onFormSubmitted when search bar form is submitted', () => {
    spyOn(component, 'onFormSubmitted');
    const searchBarElement = fixture.debugElement.query(By.css('app-search-bar'));
    searchBarElement.triggerEventHandler('formSubmitted', {});
    expect(component.onFormSubmitted).toHaveBeenCalled();
  });

  it('should display the correct number of advertise cards', () => {
    component.advertises = [
      {id: 5, title: 'skibidi', price: 166, adresse: {city: 'lyon', streetName: 'zola', adresseNumber: 46, country: 'france', postalCode: 64111}, presentationPicture: 'string', advertiseImages: [{advertise: 'string', imageSlug: 'string'}], totalPlaceNumber: 1, ActualNumberPlace: 1, reactions: [{note: 1}], disponibilitieDates: [{startedAt: 'string', endedAt: 'string', advertise: 'string'}], reservations: [{startedAt: 'string', endAt: 'string', user: {lastname: 'string'}}], services: [{name: 'string', advertise: 'string'}]},
      {id: 6, title: 'bop', price: 200, adresse: {city: 'paris', streetName: 'rue', adresseNumber: 1, country: 'france', postalCode: 75001}, presentationPicture: 'string', advertiseImages: [{advertise: 'string', imageSlug: 'string'}], totalPlaceNumber: 2, ActualNumberPlace: 2, reactions: [{note: 2}], disponibilitieDates: [{startedAt: 'string', endedAt: 'string', advertise: 'string'}], reservations: [{startedAt: 'string', endAt: 'string', user: {lastname: 'string'}}], services: [{name: 'string', advertise: 'string'}]},
      {id: 7, title: 'dop', price: 300, adresse: {city: 'marseille', streetName: 'avenue', adresseNumber: 10, country: 'france', postalCode: 13000}, presentationPicture: 'string', advertiseImages: [{advertise: 'string', imageSlug: 'string'}], totalPlaceNumber: 3, ActualNumberPlace: 3, reactions: [{note: 3}], disponibilitieDates: [{startedAt: 'string', endedAt: 'string', advertise: 'string'}], reservations: [{startedAt: 'string', endAt: 'string', user: {lastname: 'string'}}], services: [{name: 'string', advertise: 'string'}]}
    ];
    fixture.detectChanges();
    const advertiseCards = fixture.debugElement.queryAll(By.css('app-advertise-card'));
    expect(advertiseCards.length).toBe(3);
  });

  it('should display the correct title in the "Qui sommes-nous ?" section', () => {
    const qsmSection = fixture.debugElement.query(By.css('.bg-white h2'));
    expect(qsmSection.nativeElement.textContent).toContain('Qui sommes-nous ?');
  });

  it('should display the correct description in the "Qui sommes-nous ?" section', () => {
    const qsmDescription = fixture.debugElement.query(By.css('.bg-white p'));
    expect(qsmDescription.nativeElement.textContent).toContain('Cooliving est une entreprise de coliving');
  });
});