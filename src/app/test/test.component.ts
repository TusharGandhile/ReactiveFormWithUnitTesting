import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  private name='test';
  redColor='font-red'
  blueColor='font-blue';
  value = 0;
  message!: string;
  label: string='dotnet';
  title='test title';
  num=25;
  selectedNum='one';
  @Input()myInput!:string;
  @Output()myOutput : EventEmitter<string> = new EventEmitter();
  outputmsg="i am output directory";

  constructor() { }

  colorNames=['black', 'white', 'red', 'blue']
  colorList=[
    {
      name:'black',
      id:1
    },
    {
      name:'white',
      id:2
    },
    {
      name:'red',
      id:3
    },
    {
      name:'blue',
      id:4
    },
  ];
  ngOnInit(): void {
    this.title=this.myInput;
    console.log(this.title);
    this.sendValues()
  }
  sendValues(){
    this.myOutput.emit(this.outputmsg);
  }
  setDefault(){
    this.title="dotnet office";
  }

  increment() {
    if (this.value < 15) {
      this.value += 1;
      this.message = '';
    } else {
      this.message = 'Maximum reached!';
    }
  }

  decrement() {
    if (this.value > 0) {
      this.value -= 1;
      this.message = '';
    } else {
      this.message = 'Minimum reached!';
    }
  }
  button1Click(){
    this.label='dotnet office';
  }
  button2Click(){
    this.label='label value changes on button2';
  }
  onchangeInput(){
    this.label='label value changes'
  }
  onchangeLabelInput(event:any){
    this.label=event.target.value;
  }
}
