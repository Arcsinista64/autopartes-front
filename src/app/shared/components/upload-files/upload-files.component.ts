import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  files!: File[];
  src_assets!: string[];
  
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Listens to dragover event on file input component. This could be used to
   * execute style changes on file hover.
   * @param event dragover event
   */
   @HostListener('dragover', ['$event'])
   onDragOver(event: any) {
     event.preventDefault();
     event.stopPropagation();
   }
 
   /**
    * Listens to dragoleave event on file input component. This could be used to
    * execute style changes on file hover.
    * @param event dragleave event
    */
   @HostListener('dragleave', ['$event'])
   public onDragLeave(event: any) {
     event.preventDefault();
     event.stopPropagation();
   }
 
   /**
    * Lstens to file drop action on component. Emits the file dropped event on file
    * release.
    * @param event drop event
    */
   @HostListener('drop', ['$event'])
   public onDrop(event: any): void {
     event.preventDefault();
     event.stopPropagation();
     const files = event.dataTransfer.files;
     if (files.length > 0) {
       const reader = new FileReader();
       reader.readAsDataURL(files[0]);
       reader.onload = (e) => {
         this.src_assets.push(String(e.target?.result));
       }
       this.files.push(files[0]);
     }
   }
 
   /**
    * Emits the file dropped event with the first file of the list of files uploaded.
    * This component currently only handles 1 file upload at a time, TODO multiple file
    * upload.
    * @param files List of files uploaded
    */
   onFileInput(files: any): void {
     const reader = new FileReader();
     reader.onload = (e) => {
       this.src_assets.push(String(e.target?.result));
     }
     reader.readAsDataURL(files.target.files[0]);
     this.files.push(files.target.files[0]);
   }

}
