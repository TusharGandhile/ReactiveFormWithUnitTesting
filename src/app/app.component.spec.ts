import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import {Location} from '@angular/common';
import { routes } from './app-routing.module'
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';


describe('AppComponent', () => {
  let app: AppComponent;
  let apptest:TestComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appfixture: ComponentFixture<TestComponent>;

  let objRouter:Router;
  let location:Location;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        TestComponent,
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    appfixture = TestBed.createComponent(TestComponent);
    apptest = appfixture.componentInstance;

    objRouter=TestBed.get(Router);
    location=TestBed.get(Location);
    objRouter.initialNavigation();
  });
// App test cases
  it('interpolation tests', () => {
    const name: HTMLElement = fixture.debugElement.nativeElement.querySelector('#test');
    expect(name.innerHTML).toContain(app.title);
  })

  it('[App-check]should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`[App-check]should have as title 'ReactiveForm'`, () => {
    expect(app.title).toEqual('ReactiveForm');
  });

  it('[App-check]should render title', () => {
    const compiled:HTMLElement = fixture.debugElement.nativeElement.querySelector('.content');
    expect(compiled.textContent).toContain('ReactiveForm');

  });

  // test cases for email

  it('[email-check] should check mail is invalid', () => {
    let email=app.regForm.controls['email'];
    email.setValue('abcexample.com');
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();

  })
  it('[email-check] should check correct mail is entered', () => {
    let email=app.regForm.controls['email'];
    email.setValue('abc@example.com');
    expect(email.hasError('required')).toBeFalsy();//validation
    expect(email.valid).toBeTruthy();
    expect(email.pristine).toBeTruthy();

  })

// password test cases

  it('[password-check] should check password is errors', () => {
    let password=app.regForm.controls['password'];
    password.setValue('');

    expect(password.hasError('required')).toBeTruthy();//validation
    expect(password.hasError('minLength')).toBeFalsy();//validation
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();

  });


  it('[password-check] should check password Validity', () => {
    let password=app.regForm.controls['password'];
    password.setValue('kjbjbojnklnlkn4454');
    expect(password.errors).toBeNull();//validation
    expect(password.valid).toBeTruthy();//validation
    expect(password.pristine).toBeTruthy();

  });

  // form test cases

  it('[form-check] should check form is valid or not if no values entered',()=>{
    expect(app.regForm.valid).toBeFalsy();
  })

  it('[form-check] should check form is valid or not if values entered',()=>{
    app.regForm.controls['email'].setValue('email@example.com');
    app.regForm.controls['password'].setValue('sdcduhsduhc545455');
    expect(app.regForm.valid).toBeFalsy();
  })

  it('[form-submit] should check form is submitted',()=>{
    expect(app.regForm.invalid).toBeTruthy();

    let btn=fixture.debugElement.query(By.css('.btn-primary'));
    expect(btn.nativeElement.disabled).toBeFalsy();

    app.regForm.controls['email'].setValue('emailexample.com');
    app.regForm.controls['password'].setValue('sddf1255');
    fixture.detectChanges();

    expect(btn.nativeElement.disabled).toBeFalsy();
    app.SubmitForm();
    fixture.detectChanges();
  });

  // unit test for routing

  // it('unit test for default path',async(()=>{
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(location.path()).toEqual('/');
      
  //   })

  // }))

  // it('unit test for test path',async(()=>{
  //     appfixture.detectChanges();
  //     let link=appfixture.debugElement.query(By.directive(RouterLinkWithHref));
  //     console.log(link);
      
  //     link.nativeElement.click();

  //     fixture.whenStable().then(() => {
  //           expect(location.path()).toEqual('/test');
            
  //         })
  
  //   }));
  //   it('navigate to "" redirects you to /home', fakeAsync(() => { (1)
  //     objRouter.navigate(['']); (2)
  //     tick(); (3)
  //     expect(location.path()).toBe('/test'); (4)
  //   }));

});
