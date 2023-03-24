import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-my-acount-menu',
  templateUrl: './my-acount-menu.component.html',
  styleUrls: ['./my-acount-menu.component.scss']
})
export class MyAcountMenuComponent implements OnInit {
  crumbData: any = [];
  cards = [
    {
      url: 'orders',
      title: 'Mis pedidos',
      icon: 'assets/icons/box.svg',
      text: 'Rastrear paquetes, devolver pedidos o comprar algo de nuevo.'
    },
    {
      url: 'whishlist',
      title: 'Mis productos favorito',
      icon: 'assets/icons/whislist.svg',
      text: 'Navega a tus productos deseados.'
    },
    {
      url: 'addresses',
      title: 'Direcciones',
      icon: 'assets/icons/addresses.svg',
      text: 'Agrega, modifica o elimina direcciones de entrega.'
    },
    {
      url: 'payments',
      title: 'Mis pagos',
      icon: 'assets/icons/my-payments.svg',
      text: 'Administrar configuraciones y métodos de pago, ver saldos y retiros.'
    },
    {
      url: 'information',
      title: 'Información de cuenta',
      icon: 'assets/icons/profile.svg',
      text: 'Información de cuenta, cambio de contraseña y datos personales.'
    },
    {
      url: '/communication/all',
      title: 'Notificaciones',
      icon: 'assets/icons/megaphone.svg',
      text: 'Administra tus mensajes, preguntas y ofertas.'
    },
  ];
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth');
    }
    this.crumbData = [
      {txt: 'Mi cuenta', url: '/checkout/cart'}, 
    ];
  }

}
