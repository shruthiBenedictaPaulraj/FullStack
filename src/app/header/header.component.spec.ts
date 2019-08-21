import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { UserManagementService } from '../user-management.service';
import { HeaderComponent } from './header.component';
import { Observable, of, throwError } from 'rxjs';

class MockUserManagementService {
  FlagFromViewTaskScreen$: Observable<boolean>;
  constructor() { }
}

class MockRouter {
  public ne = new NavigationEnd(0, 'http://localhost:3000/addUser', 'http://localhost:3000/addUser');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
  navigate = jasmine.createSpy('navigateByUrl');
  navigateByUrl(data) {
    return of({});
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userManagementService: UserManagementService;
  let route: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{
        provide: UserManagementService,
        useClass: MockUserManagementService
      }, {
        provide: Router,
        useClass: MockRouter
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userManagementService = TestBed.get(UserManagementService);
    route = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('To check if the header data is updated when the navigation is done', () => {
    component.navigate('/addUser');
    expect(component.activeLabel).toBe('/addUser');
    component.navigate('/addProject');
    expect(component.activeLabel).toBe('/addProject');
    component.navigate('/addTask');
    expect(component.activeLabel).toBe('/addTask');
    component.navigate('/viewTask');
    expect(component.activeLabel).toBe('/viewTask');
  });
});
