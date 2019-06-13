export class Modal {  
    modal: any = null;
    data: any = null;

    dismiss() {
      this.modal.dismiss();
    }

    accept() {
      this.modal.accept();
    }

    decline() {
      this.modal.decline();
    }
}  