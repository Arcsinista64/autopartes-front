import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptsService {

  constructor() { }

  load(files: string[]): void { 
    for (const file of files) {
      const script = document.createElement('script');
      script.src = `./assets/js/${file}.js`;
      const body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
    }
  }
}
