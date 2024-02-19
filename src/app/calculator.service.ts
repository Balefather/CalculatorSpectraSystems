import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CalculatorService {

  // BehaviorSubjects are stored here
  private expressionSubject = new BehaviorSubject<string>("0")
  get expression$(){
    return this.expressionSubject.asObservable();
  }

  private resultSubject = new BehaviorSubject<string>("0")
  get result$(){
    return this.resultSubject.asObservable();
  }



  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  expressionInput(input: string) {
    if(this.expressionSubject.value.length < 26){
      if (this.expressionSubject.value === "0") {
        this.expressionSubject.next(input); // if input is 0, replace the value
      } else {
        // Ensure this.expressionSubject.value is a string before concatenating
        const currentValue = String(this.expressionSubject.value);
        this.expressionSubject.next(currentValue.concat(input)); // Append input to the existing expression
      }
      console.log(`Expression is set to: ${this.expressionSubject.value}`);
    }
    else{
      this.resultSubject.next("Expression is too long");
      console.error("Expression is too long")
    }

  }

  clearInput(){
    this.expressionSubject.next("0");
    console.log(`Expression is set to: ${this.expressionSubject.value}`);
    this.resultSubject.next("0");
  }

  calculate() {
    const encodedExpression = encodeURIComponent(this.expressionSubject.value);
    const url = `https://localhost:7275/api/Calculator/HandleExpression?expression=${encodedExpression}`;

    this.http.get<string>(url).subscribe({
      next: result => {
        console.log(`result: ${result}`);
        this.resultSubject.next(result);
      },
      error: err => {
        console.error('HTTP error:', err);
        this.resultSubject.next('Error: ' + err.error);
      }
    });
  }



}
