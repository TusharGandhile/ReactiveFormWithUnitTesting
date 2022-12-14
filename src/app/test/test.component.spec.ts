import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { TestService } from '../test.service';

import { TestComponent } from './test.component';

class MockTestService extends TestService
{
  public NewSaveMethod()
  {
    return true;
  }
}

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  // let appComponent: AppComponent;
  // let appfixture: ComponentFixture<AppComponent>;

  let debugElement: DebugElement;
  let service: TestService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ,AppComponent],
      providers: [ TestService ],
      imports: [FormsModule]
    })
    .compileComponents();

    TestBed.overrideComponent(
      TestComponent,
      {set:
        {providers:
          [{provide:TestService,useClass: MockTestService}]
        }
      }
    )

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // appfixture = TestBed.createComponent(AppComponent);
    // appComponent = appfixture.componentInstance;

    debugElement= fixture.debugElement;
    service=TestBed.inject(TestService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component['name']).toEqual('test');//accessing private variable into ts file
  });

    it('should increment and decrement value', () => {
    fixture.componentInstance.increment();
    expect(fixture.componentInstance.value).toEqual(1);

    fixture.componentInstance.decrement();
    expect(fixture.componentInstance.value).toEqual(0);

  });

 it('should increment value in template', () => {
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();

    const value = debugElement.query(By.css('h1')).nativeElement.innerText;
  
    expect(value).toEqual('1');
  });
  it('should stop at 0 and show minimum message', () => {
    const decrementBtn:HTMLButtonElement= fixture.debugElement.nativeElement.querySelector('.decrement');
    decrementBtn.click();
    fixture.detectChanges();

    const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(fixture.componentInstance.value).toEqual(0);
    expect(message).toContain('Minimum');
  });

  it('should stop at 15 and show maximum message', () => {
    fixture.componentInstance.value=15;
    const incrementBtn:HTMLButtonElement= fixture.debugElement.nativeElement.querySelector('.increment');
    incrementBtn.click();
    fixture.detectChanges();

    const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(fixture.componentInstance.value).toEqual(15);
    expect(message).toContain('Maximum');
  });

  // ngClass & ngStyle testing
  it('ngStyle test paragraph should contain font-red class ', () => {
    fixture.detectChanges();
    const paragraph:HTMLElement = fixture.debugElement.nativeElement.querySelector('#par');
    expect(paragraph.getAttribute('style')).toContain('color: black');
  });

  it('ngClass test for h1 ', () => {
    component.value=20;
    fixture.detectChanges();
    const header:HTMLElement = fixture.debugElement.nativeElement.querySelector('#header');
    expect(header.getAttribute('class')).toContain('font-red');
  });

  // event binding tests
  it('button1 test', () => {
    const button1:HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button1');
    expect(component.label).toEqual('dotnet');
    button1.click();
    fixture.detectChanges();
    expect(component.label).toEqual('dotnet office');
    
  });

  it('button2 test', () => {
    const button2:HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button2');
    expect(component.label).toEqual('dotnet');
    button2.click();
    fixture.detectChanges();
    expect(component.label).toEqual('label value changes on button2');
    
  });
  it('textbox1 test', () => {
    const textbox1:HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#textbox1');
    expect(component.label).toEqual('dotnet');
    textbox1.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.label).toEqual('label value changes');
    
  });
  it('textbox1 test', () => {
    const textbox2:HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#textbox2');
    expect(component.label).toEqual('dotnet');
    textbox2.value="value upadted"
    textbox2.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.label).toEqual("value upadted");
    
  });

  // two way data binding tests
  it('should set title from component label', (done) => {
    component.title="updated title"
fixture.detectChanges();

fixture.whenStable().then(() => {
  const title:HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#textbox3');
  expect(title.value).toEqual('updated title');
  done();
})
    
  });

  it('should changes the h1 according to the input value',(done)=>{
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const title:HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#textbox3');
      title.value ="updated value of textbox"
      title.dispatchEvent(new InputEvent('input'));      
      expect(title.value).toEqual(component.title);
      done();
    });
  });

  it('should change the value of the textbox on button click',async(()=>{
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const button:HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button');
      button.click();
      expect(component.title).toEqual('dotnet office');
      
    });
  }));
  // conditional rendering tests
  it('test case to check number is greater than 20',()=>{
    const element1:HTMLDivElement=fixture.debugElement.nativeElement.querySelector('#div1');
    const element2:HTMLDivElement=fixture.debugElement.nativeElement.querySelector('#div2');
    expect(element1).not.toBeNull();
    expect(element2).toBeNull();
    });
    it('test case to check ng-template render correctly', () => {
      component.num=15;
      fixture.detectChanges();
      const element1:HTMLDivElement=fixture.debugElement.nativeElement.querySelector('#ng1');
      const element2:HTMLDivElement=fixture.debugElement.nativeElement.querySelector('#ng2');
      expect(element1).toBeNull();
      expect(element2).not.toBeNull();
    });

    // ngSwitch test cases  
    it('should check ngSwitch-1',()=>{
      const element1:HTMLDivElement=fixture.debugElement.nativeElement.querySelector('#parentdiv');

      expect(element1.childElementCount).toEqual(1);
      expect(element1.children.length).toEqual(1);  
      expect(element1.children[0].innerHTML).toEqual('one is select'); 
    })

    it('should check ngSwitch-2',()=>{
      const element2:HTMLDivElement=fixture.debugElement.nativeElement.querySelector('#parentdiv');
      component.selectedNum="two";
      fixture.detectChanges();
      
      expect(element2.childElementCount).toEqual(1);
      expect(element2.children.length).toEqual(1);  
      expect(element2.children[0].innerHTML).toEqual('two is select'); 
    });

    // ngFor test cases 
    it('tests the simple array -1',()=>{
      const element:DebugElement[]=fixture.debugElement.queryAll(By.css('.ngFor1'));
      expect(element.length).toEqual(4);
      element.forEach((obj:DebugElement,index:number)=>{
        expect(obj.children[0].nativeElement.innerHTML).toEqual(component.colorNames[index]);
      })
    });

    it('tests the simple array of objects -2',()=>{
      const element:DebugElement[]=fixture.debugElement.queryAll(By.css('.ngFor2'));
      expect(element.length).toEqual(4);
      element.forEach((obj:DebugElement,index:number)=>{
        // console.log(obj.children[0].nativeElement.innerHTML);
        
        expect(obj.children[0].nativeElement.innerHTML).toEqual(component.colorList[index].name+" "+'-'+" "+component.colorList[index].id);
      })
    });

    it('tests the simple array of objects -3',()=>{
      const element:DebugElement[]=fixture.debugElement.queryAll(By.css('.ngFor3'));
      expect(element.length).toEqual(4);
      element.forEach((obj:DebugElement,index:number)=>{
        const output=`${index} - ${index === 0 ? true: false} - ${index%2 === 0 ? true: false} - ${index%2 !==0 ? true: false} - ${element.length-1===index ? true: false}`        
        expect(obj.children[0].nativeElement.innerHTML).toEqual(output);
      })
    });

    // test cases for dependency injection
    it('DI unit test using testbed get method',()=>{
      expect(service instanceof TestService).toBeTruthy();
    });

    it('DI unit test using inject method',inject([TestService],(instanceService:TestService)=>{
         expect(instanceService).toBeTruthy();
         expect(instanceService instanceof TestService).toBeTruthy
     }));

     it('DI unit test with overriding',()=>{ 
      let element=fixture.debugElement.injector.get(TestService);
      expect(element instanceof (MockTestService)).toBeTruthy();
     });

    
});

