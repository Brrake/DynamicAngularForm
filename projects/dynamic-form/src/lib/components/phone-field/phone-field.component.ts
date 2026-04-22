import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  protected numberText: string = '';
  protected filteredPhoneNumbers: Country[] = [];

  constructor(
    private translate: TranslateService
  ) {
    this.filteredPhoneNumbers = [...this.countries];
  }
  ngOnInit() {
    this.form?.controls[this.formName].valueChanges.subscribe(value => {
      this.refreshValues()
    });
    this.refreshValues()
  }
  public refreshValues() {
    const formControl = this.form?.get(this.formName)
    this.numberText = formControl?.value?.number || ''
    this.selectedCountry = formControl?.value?.country || this.selectedCountry
  }
  protected onSearchCountriesInput() {
    this.filteredPhoneNumbers = this.countries.filter(i =>
      (i.text || '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  protected selectPhoneItem(phone: any) {
    this.selectedCountry = phone;
    if (!this.numberText) {
      this.onPhoneSelected.emit(undefined)
      return
    }
    this.onPhoneSelected.emit({
      number: this.numberText,
      valid: this.isValidField(this.numberText),
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
  protected onTypeNumber(event: any) {
    if (!event.target.value) {
      this.onPhoneSelected.emit(undefined)
      return
    }
    this.onPhoneSelected.emit({
      number: event.target.value,
      valid: this.isValidField(event.target.value),
      country: {
        code: this.selectedCountry.code,
        country: this.selectedCountry.country
      }
    });
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
