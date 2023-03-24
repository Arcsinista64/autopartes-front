import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommunicationService } from 'src/app/communication/services/communication.service';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { CoreService } from 'src/app/core/services/core.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LocalStorageHandlerService } from 'src/app/shared/services/local-storage-handler.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';
import { Product, ProductDetail } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  sellerProducts$: Observable<Product[]> = new Observable<Product[]>();
  crumbData: any = [];
  loading = false;
  product_id = '';
  productName = '';
  slides: string[] = [];
  qtyAvailable = new Array(0);

  isDiscount = false;
  product$: Observable<ProductDetail> = new Observable<ProductDetail>();

  moreExpensive = 0;

  good: any;
  neutral: any;
  bad: any;
  good_bar: any;
  neutral_bar: any;
  bad_bar: any;
  total: any;
  rating: any;

  productAddForm = new FormGroup({
    qty: new FormControl(1),
    offer: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])
  });
  get qty(): FormControl { return this.productAddForm.get('qty') as FormControl; }
  get offer(): FormControl { return this.productAddForm.get('offer') as FormControl; }

  questionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
  });
  get question(): FormControl { return this.questionForm.get('question') as FormControl; }

  constructor(
    private route: ActivatedRoute,
    public navbar: NavbarComponent,
    private alertService: AlertService,
    private productService: ProductsService,
    private coreService: CoreService,
    private autthService: AuthService,
    private localStorageHandler: LocalStorageHandlerService,
    private communicationService: CommunicationService,
    private wishListService: WhishlistService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.product_id = this.route.snapshot.params.id;
    if (this.product_id) {
      this.getDetails(this.product_id);
    }
    window.scroll(0, 0);
  }

  // XXX: What happens it good, neutral, bad is undefinded
  getDetails(productId: string): void {
    this.product$ = this.productService.getProductDetails(productId).pipe(
      map(res => {
        this.crumbData = [
          {
            txt: 'Búsqueda de productos',
            url: '/product/search'},
          {
            txt: res.data[0].product.subcategory.category.name,
            url: '/product/search?category=' + res.data[0].product.subcategory.category.id
          },
          {
            txt: res.data[0].product.subcategory.name,
            url: '/product/search?subcategory=' + res.data[0].product.subcategory.id
          },
          {
            txt: res.data[0].product.name,
            url: '/product/detail/' + this.product_id
          },
        ];

        this.getSellerProducts(res.data[0].product.seller.id);
        this.qtyAvailable = [... Array(res.data[0].product.quantity).keys()].map(i => { return  { opt: i+1}; });
        this.slides = res.data[0].product.multimedia.map(url => url.image);
        this.isDiscount = res.data[0].product.discount;
        this.productName = res.data[0].product.name;
        this.good = res.data[0].product.seller_reviews[0].count.filter((is: any) => (is.rating === 'Positive'));
        this.neutral = res.data[0].product.seller_reviews[0].count.filter((is: any) => (is.rating === 'Neutral'));
        this.bad = res.data[0].product.seller_reviews[0].count.filter((is: any) => (is.rating === 'Negative'));
        this.calculates((this.good[0]?.count || 0), (this.neutral[0]?.count || 0), (this.bad[0]?.count || 0));
        const parcelPrices = res.data[0].product.shipment_agreement_options.map((price: { cost: any; }) => Number(price.cost));
        if (parcelPrices.length > 0) { 
          this.moreExpensive = Math.max.apply(null, parcelPrices);
        }
        return res.data[0];
      }
    ));
  }

  /**
   * 
   * @param G 'good'
   * @param N 'neutral'
   * @param B 'bad'
   */
  // XXX: wrong implementation
  calculates(G: number = 0, N: number = 0, B: number = 0): void {
    this.total = G + N + B;
    this.total > 0 ? this.rating = (( (N * 2.5) + (G * 5)) / this.total).toFixed(1) : this.rating = 0;
    this.good_bar = (100 / this.total ) * G;
    this.neutral_bar = (100 / this.total) * N;
    this.bad_bar = (100 / this.total) * B;
  }
  getSellerProducts(id: string): void {
    this.sellerProducts$ = this.productService.getProducts({seller: id}).pipe(map(res => {
      return res.data.page_data;
    }));
  }
  addToCart(): void {
    if (Number(this.qty?.value) > 0) {
      if (this.autthService.isLoggedIn()) {
          this.productService.sendProductToCart(this.product_id, this.qty?.value).subscribe(resp => {
            this.alertService.open({type: 'success', message: 'Se agregó producto con éxito'});
            this.coreService.getCartNumber();
          }, error => {
            this.alertService.open({type: 'error', message: 'No se pudo agregar el producto, vuelva a intentar mas tarde'});
          });
      } else {
        this.localStorageHandler.setProduct(this.product_id, this.qty?.value);
        setTimeout(() => {
          this.coreService.getCartNumber();
          this.alertService.open({type: 'success', message: 'Se agregó producto con éxito'});
        }, 500);
      }
    } else {
      this.alertService.open({type: 'warning', message: 'Debes de escoger alguna cantidad para este producto'});
    }
  }
  askQuestion(): void {
    const data = {
      message: this.question.value,
      product_listing: this.product_id
    };
    this.question.markAsDirty();
    if (this.questionForm.valid) {
        this.productService.sendQuestion(data).subscribe(_ => {
          this.alertService.open({ type: 'success', message: 'Se envió la pregunta con éxito' });
          this.question.reset();
        },
          error => {
            this.alertService.open({type: 'error', message: 'Hubo un error al enviar la pregunta, por favor intente más tarde'});
          }
      );
    }
  }
  postOffer(originalPrice: string): void {
    this.loading = true;
    const data = {
      product: this.product_id ,
      message: 'Nueva oferta en ' + this.productName,
      offer: this.offer.value
    };
    this.offer.markAsDirty();
    if (this.offer.valid) {
      if (Number(this.offer.value) < Number(originalPrice)) {
        this.communicationService.createOffer(data).subscribe(resp => {
          this.alertService.open({type: 'success', message: 'Se creó oferta con éxito'});
          this.loading = false;
          this.offer.reset();
        }, error => {
          this.loading = false;
          this.alertService.open({type: 'error', message: error.error.message});
        });
      } else { 
        this.alertService.open({type: 'warning', message: 'La oferta debe ser menor al precio original'});
        this.loading = false;
        this.offer.reset();
      }
    } else { 
      this.loading = false;
    }
  }
  addToWhishList(id: string): void {
    if (this.authService.isLoggedIn()) { 
        this.wishListService.add(id).subscribe(resp => {
          this.alertService.open({type: 'success', message: 'Se agregó el producto con éxito a favoritos'});
        }, error => {
          this.alertService.open({type: 'error', message: 'No se logró agregar el producto a favoritos'});
        });
    } else {
      this.alertService.open({type: 'warning', message: 'Inicie sesión para agregar a productos deseados'});
      this.router.navigate(['auth']);
    }
  }
  removeOnWhishList(id: string): void {
    this.wishListService.remove(id).subscribe(resp => {
      this.alertService.open({type: 'success', message: 'Se eliminó el producto con éxito de favoritos'});
    }, error => {
      this.alertService.open({type: 'error', message: 'No se logró eleminar el producto de favoritos, intente más tarde'});
    });
  }
}


