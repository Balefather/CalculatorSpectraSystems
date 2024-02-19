import { Component } from '@angular/core';
import {CalculatorService} from "../calculator.service";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  constructor(private calcService: CalculatorService) {}

  clickInteger(input: string){
    this.calcService.expressionInput(input);
  }
  clear(){
    this.calcService.clearInput();
  }

  calculate(){
    this.calcService.calculate();
  }
}
