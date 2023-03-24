import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from '../../services/alert.service';
import { WhishlistService } from '../../services/whishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {
  @Input() idProduct = '';
  @Input() active = false;

  @Output() data: EventEmitter<{idProduct: string; active: boolean}> = new EventEmitter<{idProduct: string; active: boolean}>();

  constructor(
    private wishListService: WhishlistService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  addToWhishList(): void {
    if(this.authService.isLoggedIn()) { 
      if (!this.active) {
        this.wishListService.add(this.idProduct).subscribe(resp => {
          this.active = true;
          this.alertService.open({type: 'success', message: 'Se agregó el producto con éxito a favoritos'});
        }, error => {
          this.alertService.open({type: 'error', message: 'No se logró agregar el producto a favoritos'});
        });
      } else {
        this.wishListService.remove(this.idProduct).subscribe(resp => {
          this.active = false;
          this.alertService.open({type: 'success', message: 'Se eliminó el producto con éxito de favoritos'});
        }, error => {
          this.alertService.open({type: 'error', message: 'No se logró eleminar el producto de favoritos, intente más tarde'});
        });
      }
    } else { 
      this.alertService.open({type: 'warning', message: 'Inicie sesión para agregar a productos deseados'});
      this.router.navigate(['auth']);
    }
    
    const idProduct = this.idProduct;
    const active = this.active;
    this.data.emit({idProduct, active});
  }

}
