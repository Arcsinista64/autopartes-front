import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  inputsForm = new FormGroup({
    number1: new FormControl('', Validators.required),
    number2: new FormControl('', Validators.required),
    number3: new FormControl('', Validators.required),
    number4: new FormControl('', Validators.required),
    number5: new FormControl('', Validators.required),
    number6: new FormControl('', Validators.required),
  });

  @Output() verifyToken = new EventEmitter<string>();
  @Output() tryAgain = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
    this.inputsForm.valueChanges.subscribe(resp => {
      if (this.inputsForm.status === 'VALID') {
        const token = resp.number1 + resp.number2 + 
                      resp.number3 + resp.number4 + 
                      resp.number5 + resp.number6;
        this.verifyToken.emit(token);
      }
    });
  }

  onChange(from: any, to: any): void { 
    to.focus();
  }

  clean(): void { 
    if(this.inputsForm.dirty) { 
      this.inputsForm.reset();
    }
  }
}
