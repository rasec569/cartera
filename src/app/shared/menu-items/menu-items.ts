import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'login', type: 'link', name: 'login', icon: 'crop_7_5' },
  { state: 'expansion', type: 'link', name: 'form', icon: 'crop_7_5' },
  { state: 'inmueble', type: 'link', name: 'Inmuebles', icon: 'maps_home_work' },
  { state: 'panel', type: 'link', name: 'Panel', icon: 'tune' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
