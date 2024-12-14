import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[blobImage]',
})
export class BlobImageDirective implements OnInit {
  @Input() blobImage!: {
    container: string,
    id:string
  }

  unsubscribe$ = new Subject<void>();

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    const element = this.elRef.nativeElement as HTMLImageElement;
    element.src = `${environment.imageBaseUrl}/${this.blobImage.container}/${this.blobImage.id}?time=${new Date().getTime()}`;
  }
}
