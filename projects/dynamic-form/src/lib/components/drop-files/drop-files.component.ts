import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'drop-files',
  standalone: false,
  templateUrl: './drop-files.component.html',
  styleUrl: './drop-files.component.scss'
})
export class DropFilesComponent {
  files: File[] = [];
  isDragOver = false;
  @Input() id: string = '';
  @Input() accept: string = 'image/png, image/gif, image/jpeg, image/jpg';
  @Input() maxFiles: number = 5;
  @Output() fileSelected = new EventEmitter<File[]>();

  constructor(
    private translate: TranslateService
  ) { }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    if (!event.dataTransfer) {
      return;
    }
    const acceptedTypes = this.accept.split(',').map(x => x.trim());
    const droppedFiles = Array.from(event.dataTransfer.files);

    if((this.files.length)+(droppedFiles.length) > this.maxFiles) {
      return
    }
    
    const filteredFiles = droppedFiles.filter(file => acceptedTypes.includes(file.type));

    if (filteredFiles.length === 0) {
      console.log('Nessun file supportato è stato trascinato.');
      return;
    }
    this.files.push(...droppedFiles);
    this.fileSelected.emit(this.files);
    // qui puoi chiamare il servizio per l’upload
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const acceptedTypes = this.accept.split(',').map(x => x.trim());
    const selectedFiles = Array.from(input.files);
    const filteredFiles = selectedFiles.filter(file => acceptedTypes.includes(file.type));

    if((this.files.length)+(selectedFiles.length) > this.maxFiles) {
      return
    }
    if (filteredFiles.length === 0) {
      console.log('Nessun file supportato è stato trascinato.');
      return;
    }
    this.files.push(...selectedFiles);
    // anche qui eventuale upload
    this.fileSelected.emit(this.files);
  }
  bytesToMb(bytes: number) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }
  removeFile(index: number) {
    this.files.splice(index, 1);
    this.fileSelected.emit(this.files);
  }
  get translateTitle() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Trascina qui i file o clicca per selezionare' : 'Drag and drop files or click to select'
  }
}
