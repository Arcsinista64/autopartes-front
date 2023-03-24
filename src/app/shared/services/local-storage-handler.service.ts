import { Injectable } from '@angular/core';
export const AUTOPARTES_PRODUCTS = 'autopartes_product';
export const AUTOPARTES_COUPONS = 'autopartes_coupons';
export const AUTOPARTES_SHIPMENTS = 'autopartes_shipments';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageHandlerService {

  constructor() { }
  /**
   * Products
   */

  /**
   * Adds a product if to the array of data in localStorage
   * @param idProduct Product id
   * @returns True if added
   */
   setProduct(product: string, quantity: any): boolean {
    this.deleteProduct(product);
    const oldData = localStorage.getItem(AUTOPARTES_PRODUCTS);
    if (oldData === null) {
      const newData = [{product, quantity}];
      localStorage.setItem(AUTOPARTES_PRODUCTS, JSON.stringify(newData));
    } else {
      const arrayOldData = JSON.parse(oldData) as Array<SimpleLocalProduct>;
      arrayOldData.push({product, quantity});
      localStorage.setItem(AUTOPARTES_PRODUCTS, JSON.stringify(arrayOldData));
    }
    return true;
  }

  getProducts(): Array<SimpleLocalProduct> {
    const data = localStorage.getItem(AUTOPARTES_PRODUCTS);
    if (data) { return JSON.parse(data) as Array<SimpleLocalProduct>; }
    return [];
  }

  deleteAllProducts(): boolean {
    localStorage.removeItem(AUTOPARTES_PRODUCTS);
    return true;
  }

  deleteProduct(product: string): boolean {
    const data = localStorage.getItem(AUTOPARTES_PRODUCTS);
    if (data) {
      const arrData = JSON.parse(data) as Array<SimpleLocalProduct>;
      const index = arrData.map(obj => obj.product).indexOf(product);
      if (index !== -1) {
        arrData.splice(index, 1);
        localStorage.removeItem(AUTOPARTES_PRODUCTS);
        localStorage.setItem(AUTOPARTES_PRODUCTS, JSON.stringify(arrData));
      }
      return true;
    }
    return false;
  }

  productsLength(): string {
    const data = localStorage.getItem(AUTOPARTES_PRODUCTS);
    if (data) {
      const arrData = JSON.parse(data) as Array<SimpleLocalProduct>;
      return arrData.length.toString();
    }
    return '0';
  }

  // True if it's empty, False if not
  productsEmpty(): boolean {
    return localStorage.getItem(AUTOPARTES_PRODUCTS) === null;
  }

  /**
   * COUPONS
   */
  setCoupon(idCoupon: string): boolean {
    const oldData = localStorage.getItem(AUTOPARTES_COUPONS);
    if (oldData === null) {
      const newData = [idCoupon];
      localStorage.setItem(AUTOPARTES_COUPONS, JSON.stringify(newData));
    } else {
      const arrayOldData = JSON.parse(oldData) as Array<string>;
      arrayOldData.push(idCoupon);
      localStorage.setItem(AUTOPARTES_COUPONS, JSON.stringify(arrayOldData));
    }
    return true;
  }

  getCoupons(): Array<string> {
    const data = localStorage.getItem(AUTOPARTES_COUPONS);
    if (data) { return JSON.parse(data) as Array<string>; }
    return [];
  }

  deleteAllCoupons(): boolean {
    localStorage.removeItem(AUTOPARTES_COUPONS);
    return true;
  }

  deleteCoupon(idCoupon: string): boolean {
    const data = localStorage.getItem(AUTOPARTES_COUPONS);
    if (data) {
      const arrData = JSON.parse(data) as Array<string>;
      const index = arrData.indexOf(idCoupon);
      arrData.splice(index, 1);
      localStorage.removeItem(AUTOPARTES_COUPONS);
      localStorage.setItem(AUTOPARTES_COUPONS, JSON.stringify(arrData));
      return true;
    }
    return false;
  }

  // ALL
  deleteAll(): boolean {
    localStorage.removeItem(AUTOPARTES_PRODUCTS);
    localStorage.removeItem(AUTOPARTES_COUPONS);
    localStorage.removeItem(AUTOPARTES_SHIPMENTS);
    return true;
  }

}


export interface SimpleLocalProduct {
  product: string;
  quantity: any;
}

export interface LocalShipmentOptions {
  cart_product_id: any;
  shipment_agreement_option: any;
}
