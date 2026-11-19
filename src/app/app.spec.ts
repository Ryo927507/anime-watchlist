import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';
import { AnimeService } from './services/anime-service';
import { LoginOverlay } from './ui-overlays/login-overlay/login-overlay';
import { of } from 'rxjs';

describe('App', () => {
  let animeServiceMock: jasmine.SpyObj<AnimeService>;

  beforeEach(async () => {
    localStorage.removeItem('currentUser');
    animeServiceMock = jasmine.createSpyObj<AnimeService>('AnimeService', ['getAnime', 'userExists']);
    animeServiceMock.getAnime.and.returnValue(of([]));
    animeServiceMock.userExists.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: AnimeService, useValue: animeServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('requires an existing username before showing the app and logs out cleanly', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-login-overlay')).toBeTruthy();
    expect(compiled.querySelector('app-aw-main')).toBeFalsy();

    const loginOverlay = fixture.debugElement.query(By.directive(LoginOverlay)).componentInstance as LoginOverlay;
    loginOverlay.userName = ' NewUser ';
    await loginOverlay.login();
    fixture.detectChanges();

    expect(animeServiceMock.userExists).toHaveBeenCalledWith('NewUser');
    expect(localStorage.getItem('currentUser')).toBe('NewUser');
    expect(compiled.querySelector('app-aw-main')).toBeTruthy();

    (compiled.querySelector('.logout-button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(compiled.querySelector('app-login-overlay')).toBeTruthy();
  });

  it('shows an error and stays logged out for an unknown username', async () => {
    animeServiceMock.userExists.and.returnValue(Promise.resolve(false));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const loginOverlay = fixture.debugElement.query(By.directive(LoginOverlay)).componentInstance as LoginOverlay;
    loginOverlay.userName = 'UnknownUser';
    await loginOverlay.login();
    fixture.detectChanges();

    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(compiled.querySelector('app-aw-main')).toBeFalsy();
    expect(compiled.querySelector('[role="alert"]')?.textContent).toContain('wurde nicht gefunden');
  });

  it('restores a stored username without showing the login screen', () => {
    localStorage.setItem('currentUser', 'SavedUser');

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-login-overlay')).toBeFalsy();
    expect(compiled.querySelector('app-aw-main')).toBeTruthy();
  });
});
