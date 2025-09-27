import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonPopover } from '@ionic/angular/common';
import { TranslateService } from '@ngx-translate/core';
import { countries } from '../../countries';
import * as libphonenumber from 'google-libphonenumber';
import { Country } from '../../models/countries.model';

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrl: './phone-field.component.scss',
  standalone: false
})
export class PhoneFieldComponent implements OnInit {
  @ViewChild('popover') popover!: IonPopover;
  @Input() id: string = '';
  @Input() errorText: string = '';
  @Output() onPhoneSelected = new EventEmitter<any>();

  countries: Country[] = countries

  selectedCountry: Country = {
    code: '+39',
    country: 'IT'
  };
  phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();


  searchText: string = '';
  numberText: string = '';
  filteredPhoneNumbers: Country[] = [];

  constructor(
    private translate: TranslateService
  ) {
    this.filteredPhoneNumbers = [...this.countries];
  }
  ngOnInit() {
  }
  onSearchCountriesInput() {
    this.filteredPhoneNumbers = this.countries.filter(i =>
      (i.text || '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectPhoneItem(phone: any) {
    this.selectedCountry = phone;
    if (!this.numberText) {
      this.onPhoneSelected.emit(undefined)
      this.popover.dismiss({ data: phone }, '');
      return
    }
    let isValid = false
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(this.numberText, this.selectedCountry.country);
      isValid = this.phoneUtil.isValidNumber(number) || this.phoneUtil.isValidNumberForRegion(number, this.selectedCountry.country)
    } catch (e) {
      isValid = false
    }
    this.onPhoneSelected.emit({
      number: this.numberText,
      valid: isValid,
      country: {
        code: this.selectedCountry.code,
        country: this.selectedCountry.country
      }
    });
    this.popover.dismiss({ data: phone }, '');
  }
  onTypeNumber(event: any) {
    if (!event.target.value) {
      this.onPhoneSelected.emit(undefined)
      return
    }
    let isValid = false
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(event.target.value, this.selectedCountry.country);
      isValid = this.phoneUtil.isValidNumber(number) || this.phoneUtil.isValidNumberForRegion(number, this.selectedCountry.country)
    } catch (e) {
      isValid = false
    }
    this.onPhoneSelected.emit({
      number: event.target.value,
      valid: isValid,
      country: {
        code: this.selectedCountry.code,
        country: this.selectedCountry.country
      }
    });
  }
  openPhoneSelect() {
    const button = document.querySelector('#open-' + this.id) as HTMLIonButtonElement;
    button.click();
  }

  get translateClose() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Chiudi' : 'Close'
  }
  get translatePrefix() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Prefisso' : 'Prefix'
  }
  get translateSearch() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Cerca' : 'Search'
  }
}
