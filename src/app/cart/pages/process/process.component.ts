import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  show = {
    cart: true,
    information: false,
    confirmation: false
  };
  shipmentCompaniesData: any = [];
  shipmentCompaniesPrices: any = [];
  oxxo = false;
  envia = 0;

  constructor() { }

  ngOnInit(): void {
    this.show = {
      cart: true,
      information: false,
      confirmation: false
    };
  }

  openCheckoutInfo(event: any): void {
    this.shipmentCompaniesData = event.shipment_companies_data;
    this.shipmentCompaniesPrices = event.shipment_companies_prices;

    this.show = {
      cart: false,
      information: true,
      confirmation: false
    };
  }

  openCheckoutConfirmation(event: any): any {
    this.oxxo = event.oxxo;
    this.shipmentCompaniesData = event.shipment_companies_data;
    this.shipmentCompaniesPrices = event.shipment_companies_prices;
    this.shipmentCompaniesPrices.push(event.enviaPrices);

    this.show = {
      cart: false,
      information: false,
      confirmation: true
    };
  }
}
