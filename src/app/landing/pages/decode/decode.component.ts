import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.scss']
})
export class DecodeComponent implements OnInit {

  decodeForm = new FormGroup({
    number: new FormControl('', [Validators.required, Validators.pattern('^[0-9-]+$')]), //numbers and hyphens
  });
  get number(): FormControl { return this.decodeForm.get('number') as FormControl; }
  
  crumbData: any = [];

  constructor() { }

  ngOnInit(): void {
    this.crumbData = [
      {txt: 'Decodifica tu serie', url: '/decode'}, 
    ];
  }

  decodeVIN() { 
    this.number.markAsDirty();
    if(this.decodeForm.valid) {
      const vin = this.number.value.replace(/-/g, ""); 
      window.location.href = `https://www.decodethis.com/vin/${vin}`;
    }
  }
}
