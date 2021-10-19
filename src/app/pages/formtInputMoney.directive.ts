import {Directive, ElementRef, forwardRef, HostListener, Input, OnDestroy} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { formatNumber } from '@angular/common';

@Directive({
  selector: 'input[appFormtInputMoney]',
  providers: [
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: FormtInputMoneyDirective},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormtInputMoneyDirective),
      multi: true
    }
  ]
})
export class FormtInputMoneyDirective {
  locale = 'en';
  decimalMarker!: string;

  constructor(private element: ElementRef<HTMLInputElement>) {
  }

  private _value!: string | null;

  get value(): string | null {
    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }

  @HostListener('input', ['$event.target.value'])
  input(value: any) {
    //Find all numerics, decimal marker(, or .) and -
    //It will delete thousandSeparator cos it's always opposite to decimal marker
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    //Separate value on before and after decimal marker
    const [integer, decimal] = value.replace(regExp, '').split(this.decimalMarker);

    //Send non localized value, with dot as decimalMarker to API
    this._value = decimal ? integer.concat('.', decimal) : integer;

    // If decimal separator is last character don't update
    // because it will delete . || ,
    if (this.isLastCharacterDecimalSeparator(value)) {
      this._value = value;
    }

    // here to notify Angular Validators
    this._onChange(this._value);
  }

  @HostListener('blur')
  _onBlur() {
    /**
     * Adding thousand separators
     */
    this.formatValue(this._value);
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue();
  }

  _onChange(value: any): void {}

  /**
   * @param value
   * apply formatting on value assignment
   */
  writeValue(value: any) {
    this._value = value;
    this.formatValue(this._value);
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched() {}

  isLastCharacterDecimalSeparator(value: any) {
    return isNaN(value[value.length - 1]);
  }


  private formatValue(value: string | null) {
    if (value === null) {
      this.element.nativeElement.value = '';
      return;
    }

    if (this.isLastCharacterDecimalSeparator(value)) {
      this.element.nativeElement.value = value;
      return;
    }

    const [thousandSeparator, decimalMarker] = formatNumber(1000.99, this.locale).replace(/\d/g, '');
    this.decimalMarker = decimalMarker;

   //  ‎Aquí el valor siempre debe venir con . Como marcador decimal, por lo tanto, cualquier otro comportamiento es un error
    const [integer, decimal] = value.split('.');

    // ‎Agrupa cada tres elementos y agrega milesSeparador después de ellos
    this.element.nativeElement.value = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    //Add decimals and decimalMarker if any
    if (decimal) {
      this.element.nativeElement.value = this.element.nativeElement.value.concat(decimalMarker, decimal);
    }
  }

  private unFormatValue() {
    const value = this.element.nativeElement.value;
    if (this.isLastCharacterDecimalSeparator(value)) {
      return;
    }
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    const [integer, decimal] = value.replace(regExp, '').split(this.decimalMarker);
if(decimal== undefined){
  this._value = integer.concat('', '');
  if (value) {
    this.element.nativeElement.value = this._value;
  } else {
    this.element.nativeElement.value = '';
  }
}else{
  this._value = integer.concat('.', decimal);
  if (value) {
    this.element.nativeElement.value = this._value;
  } else {
    this.element.nativeElement.value = '';
  }
}


  }
}
