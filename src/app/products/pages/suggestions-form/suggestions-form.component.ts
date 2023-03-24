import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-suggestions-form',
  templateUrl: './suggestions-form.component.html',
  styleUrls: ['./suggestions-form.component.scss']
})
export class SuggestionsFormComponent implements OnInit {
  crumbData: any = [];

  suggestionForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', [Validators.required]),
  });

  get email(): FormControl { return this.suggestionForm.get('email') as FormControl; }
  get description(): FormControl { return this.suggestionForm.get('description') as FormControl; }

  constructor(
    private productsService: ProductsService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crumbData = [
      {txt: 'Búsqueda de productos', url: '/product/search'},
      {txt: 'Enviamos un mensaje', url: '/product/suggestions'},
    ];
  }

  sendSuggestion(): void {
    this.suggestionForm.markAllAsTouched();
    const data = {
      email: this.email.value,
      description: this.description.value
    };

    if (this.suggestionForm.valid) { 
      this.productsService.sendSuggestion(data).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Se envió la sugerencia con éxito' });
        this.router.navigate(['/product/search']);
      },
        error => {
          this.alertService.open({type: 'error', message: 'Hubo un error al enviar la sugerencia, por favor intente más tarde'});
        }
      );
    }
  }

}
