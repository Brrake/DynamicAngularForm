import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { countries } from '../../countries';
import * as libphonenumber from 'google-libphonenumber';
import { Country } from '../../models/countries.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrl: './phone-field.component.scss',
  standalone: false
})
export class PhoneFieldComponent implements OnInit {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() form: FormGroup | undefined;
  @Input() formName: string = '';
  @Output() onPhoneSelected = new EventEmitter<any>();

  protected countries: Country[] = countries

  protected selectedCountry: Country = {
    code: '+39',
    country: 'IT'
  };
  protected phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

  protected searchText: string = '';
  protected filteredPhoneNumbers: Country[] = [];

  constructor(
    private translate: TranslateService
  ) {
    this.filteredPhoneNumbers = [...this.countries];
  }
  ngOnInit() {

  }

  protected onSearchCountriesInput() {
    this.filteredPhoneNumbers = this.countries.filter(i =>
      (i.text || '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  protected selectPhoneItem(phone: any) {
    this.selectedCountry = phone;
    if (!this.phoneValue) {
      this.onPhoneSelected.emit(undefined)
      return
    }
    this.onPhoneSelected.emit({
      number: this.phoneValue,
      valid: this.isValidField(this.phoneValue),
      country: {
        code: this.selectedCountry.code,
        country: this.selectedCountry.country
      }
    });
  }
  protected isValidField(phone: string) {
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(phone, this.selectedCountry.country);
      return this.phoneUtil.isValidNumber(number) || this.phoneUtil.isValidNumberForRegion(number, this.selectedCountry.country)
    } catch (e) {
      return false
    }
  }
  get phoneValue(): string {
    return this.form?.get(this.formName)?.value?.number || '';
  }

  protected onTypeNumber(event: any) {
    const value = event.target.value || '';
    const control = this.form?.get(this.formName);

    if (!control) return;

    if (!value) {
      control.setValue(undefined);
      this.onPhoneSelected.emit(undefined);
      return;
    }
    const body = {
      ...(control.value || {}),
      number: value,
      country: {
        code: this.selectedCountry.code,
        country: this.selectedCountry.country
      }
    }
    control.setValue(body);
    this.onPhoneSelected.emit(body);
  }
  protected openPhoneSelect() {
    const button = document.querySelector('#open-' + this.id) as HTMLButtonElement;
    button.click();
  }

  protected get translatePrefix() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Seleziona Prefisso' : 'Select Prefix'
  }
  protected get translateDescription() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Inserisci il suffisso del tuo paese' : 'Enter the suffix of your country'
  }
  protected get translateSearch() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Cerca' : 'Search'
  }
  protected get translateNoResults() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Nessun risultato trovato' : 'No results found'
  }
}
