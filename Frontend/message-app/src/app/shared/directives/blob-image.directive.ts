import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[blobImage]',
})
export class BlobImageDirective{
  @Input('blobImage') set setBlobImage(blobImage: {container: string,id:string}) {
    this.blobImage = blobImage
    this.setImage()
  }

  blobImage!: {container: string,id:string}

  unsubscribe$ = new Subject<void>();

  constructor(private elRef: ElementRef) {}

  setImage(): void {
    const element = this.elRef.nativeElement as HTMLImageElement;
    element.src = `${environment.imageBaseUrl}/${this.blobImage.container}/${this.blobImage.id}?time=${new Date().getTime()}`;
  }
}
