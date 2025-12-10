import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonType } from '../../models/dynamic-form.model';

@Component({
  selector: 'button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss'],
  standalone: false
})
export class ButtonLoaderComponent implements OnInit {
  @Input() loadSpinner: boolean = false
  @Input() loadCheck: boolean = false
  @Input() isFormValid: boolean = true
  @Input() text: string = ''
  @Input() icon: string = ''
  @Input() circular: boolean = false
  @Input() icon_position: string = 'left'
  @Input() type: string = 'submit'
  @Input() color: string = 'primary'
  @Input() text_color: string = 'white'
  @Input() margin: boolean = true

  @Input() button_type: ButtonType = ButtonType.PILL
  @Input() large: boolean = false
  @Input() expand: boolean = false
  @Input() pulse: boolean = false

  @Output() onSubmit = new EventEmitter()

  constructor() { }
  ngOnInit() {
  }
  getClassFromIcon(): string {
    if (this.icon == 'credit-card') {
      return 'uil uil-credit-card'
    }
    if (this.icon == 'deliveroo') {
      return 'uil uil-credit-card'
    }
    if (this.icon == 'back') {
      return 'uil uil-angle-left-b'
    }
    if (this.icon == 'info') {
      return 'uil uil-info-circle'
    }
    return this.icon
  }
  getTextColor() {
    if (this.text_color == 'white') {
      return '#fff'
    }
    if (this.text_color == 'deliveroo') {
      return '#35b8b2'
    }
    if (this.text_color == 'red') {
      return '#e2626b'
    }
    if (this.text_color == 'green') {
      return '#45c4a0'
    }
    if (this.text_color == 'yellow') {
      return '#fab758'
    }
    if (this.text_color == 'pink') {
      return '#d16b86'
    }
    return this.text_color
  }
  onClick() {
    this.onSubmit.emit()
  }

}
