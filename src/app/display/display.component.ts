import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {CalculatorService} from "../calculator.service";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent {


  expression$: Observable<string> | undefined;
  result = "0";

  constructor(private calcService: CalculatorService) {}

  ngOnInit(){
    this.expression$ = this.calcService.expression$;

    this.calcService.result$.subscribe(result => {
      this.result = result;
    });
  }
}
