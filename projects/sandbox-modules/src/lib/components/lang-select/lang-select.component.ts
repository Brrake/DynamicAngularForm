import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class SupportedLang {
  name: string = '';
  name_en?: string = '';
  code: string = '';
  url: string = '';
    constructor(init?: Partial<SupportedLang>) {
      Object.assign(this, {
        name: 'Italiano',
        name_en: 'Italian',
        code: 'IT',
        url: './assets/img/flags/it.png',
        ...init
      });
    }
}
@Component({
  selector: 'app-lang-select',
  standalone: false,
  templateUrl: './lang-select.component.html',
  styleUrl: './lang-select.component.scss'
})
export class LangSelectComponent implements OnInit {

  selectedLang: SupportedLang = new SupportedLang()
  supportedLangs: SupportedLang[] = require('./assets/json/supported_langs.json')

  constructor(private translate: TranslateService) {
    this.supportedLangs.find(lang => lang.code === this.translate.currentLang)
    this.selectedLang = this.supportedLangs.find(lang => lang.code === this.translate.currentLang) || new SupportedLang()
  }
  ngOnInit(): void {

  }
  switchLanguage(language: string) {
    localStorage.setItem('lang', language)
    window.location.reload()
  }
}
