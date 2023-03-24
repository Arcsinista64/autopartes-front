import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { AlertOverlayRef } from '../components/alert/alert-overlay-ref';
import { AlertComponent } from '../components/alert/alert.component';
import { ALERT_DATA, AlertData } from './alert-service.tokens';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private injector: Injector,
    private overlay: Overlay
  ) { }

  /**
   * Instantiates a new WeakMap for our custom injection tokens, creates a PortalInjector
   * with this data and returns it.
   * @param data Instance of AlertData with the alert message and type @see AlertData
   * @param alertRef The alertRef instance to set as part of the custom Injection tokens
   * @returns An instance of PortalInjector with the alert custom tokens
   */
  private createInjector(data: AlertData, alertRef: AlertOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(AlertOverlayRef, alertRef);
    injectionTokens.set(ALERT_DATA, data);

    return new PortalInjector(this.injector, injectionTokens);
  }

  /**
   * Creates an injector with our custom injection tokens in order to communicate with
   * the newly created alertRef. This leverages Angular CDK ComponentPortal and OverlayRef
   * to handle Alert display in the browser and disposing logic.
   * @param overlayRef The new, pre-configured OverlayRef to attach to
   * @param data Instance of AlertData with the alert message and type @see AlertData
   * @param alertRef The AlertOverlayRef instance to create the injector based on
   */
  private attachDialogContainer(overlayRef: OverlayRef, data: AlertData, alertRef: AlertOverlayRef): any {
    const injector = this.createInjector(data, alertRef);

    const containerPortal = new ComponentPortal(AlertComponent, null, injector);
    const containerRef: ComponentRef<AlertComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  /**
   * Creates a new overlay based on the configuration or base configuration.
   * The base configuration sets the overlay for the top right section of the
   * screen.
   * @param config The overlay config. Optional.
   */
  private createOverlay(config: OverlayConfig = {}): OverlayRef {
    const positionStrategy = new GlobalPositionStrategy();
    let options;
    positionStrategy.top('20px');
    if (window.innerWidth > 600) {
      options = {
        width: '425px',
        maxWidth: '50%',
        positionStrategy,
        ...config
      };
      positionStrategy.right('20px');
    } else {
      options = {
        width: '350px',
        maxWidth: '425px',
        positionStrategy,
        ...config
      };
      positionStrategy.left('3%');
    }
    return this.overlay.create(options);
  }

  /**
   * Creates a new Angular CDK overlay, injects the alert data as a custom injection
   * token and attaches the AlertComponent to the ComponentPortal.
   * @param data Instance of AlertData with the alert message and type @see AlertData
   * @param config The overlay config. Optional.
   * @returns An instance of the created @see AlertOverlayRef
   */
  open(data: AlertData, config: OverlayConfig = {}): any {
    const overlayRef = this.createOverlay(config);
    const alertRef = new AlertOverlayRef(overlayRef);
    this.attachDialogContainer(overlayRef, data, alertRef);

    return alertRef;
  }
}
