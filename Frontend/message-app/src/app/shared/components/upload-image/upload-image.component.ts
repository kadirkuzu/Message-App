import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @ViewChild('imageInput') imageInput!: ElementRef;
  @Input() modalId = ''
  @Input() title = ''

  @Output() upload = new EventEmitter<{file:File,preview:string}>()

  selectedFile?: File
  imagePreview?: string

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.upload.emit({file:this.selectedFile,preview: this.imagePreview!})
    }
  }

  clear(){
    this.selectedFile = undefined
    this.imagePreview = undefined
    this.imageInput.nativeElement.value = ''
  }
}
