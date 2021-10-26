import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  /* { state: 'login', type: 'link', name: 'login', icon: 'monetization_on' }, */
  { state: 'Cartera', type: 'link', name: 'Cartera', icon: 'card_travel' },
  { state: 'Clientes', type: 'link', name: 'Clientes', icon: 'family_restroom' },
  { state: 'Proyectos', type: 'link', name: 'Proyectos', icon: 'cases' },
  { state: 'Inmuebles', type: 'link', name: 'Inmuebles', icon: 'maps_home_work' },
  { state: 'Archivos', type: 'link', name: 'Archivo', icon: 'drive_folder_upload' },
  { state: 'Acreedores', type: 'link', name: 'Acreedores', icon: 'request_quote' },
  { state: 'Panel', type: 'link', name: 'Panel', icon: 'tune' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
