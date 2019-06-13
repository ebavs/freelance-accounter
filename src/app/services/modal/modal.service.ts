import { 
  ApplicationRef, 
  Type, 
  ComponentFactoryResolver, 
  EmbeddedViewRef, 
  Injectable, 
  Injector, 
  ComponentRef 
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { Modal } from './modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { AlertComponent } from './alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private elementRef: ComponentRef<Modal>;
  private modalRef: ComponentRef<ModalComponent>;
  private resolve: Function;
  private reject: Function;
  private modalData: Object = {
    title: "Titulo",
    message: "Mensaje",
    btnOkText: "Ok",
    btnCancelText: "Cancel"
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

    confirm(data: any) {
      return this.open(ConfirmComponent, Object.assign(this.modalData, data));
    }
    
    alert(data: any) {
      return this.open(AlertComponent, Object.assign(this.modalData, data));
    }

    private open(component: Type<Modal>, data: any): Promise<string> {
      if (this.modalRef)
        return;
  
      return new Promise((resolve, reject) => {
        this.elementRef = this.componentFactoryResolver
          .resolveComponentFactory(component)
          .create(this.injector);
        this.appRef.attachView(this.elementRef.hostView);
        this.elementRef.instance.modal = this;
        this.elementRef.instance.data = data;
    
        this.modalRef = this.componentFactoryResolver
          .resolveComponentFactory(ModalComponent)
          .create(this.injector, [[this.elementRef.location.nativeElement]]);
        this.modalRef.instance.data = data;
        this.modalRef.instance.modal = this;
        this.appRef.attachView(this.modalRef.hostView);
    
        document.body.appendChild(this.modalRef.location.nativeElement);

        this.resolve = resolve;
        this.reject = reject;
      });
      
    }
  
  
    private close(): void {
      this.appRef.detachView(this.elementRef.hostView);
      this.elementRef.destroy();
      this.elementRef = null;
  
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }

    dismiss() {
      this.close();
      this.reject('dismiss');
    }

    accept() {
      this.close();
      this.resolve('accept');
    }

    decline() {
      this.close();
      this.reject('decline');
    }
}
