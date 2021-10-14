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
  { state: 'cartera', type: 'link', name: 'Cartera', icon: 'card_travel' },
  { state: 'clientes', type: 'link', name: 'Clientes', icon: 'family_restroom' },
  { state: 'proyectos', type: 'link', name: 'Proyectos', icon: 'cases' },
  { state: 'inmueble', type: 'link', name: 'Inmuebles', icon: 'maps_home_work' },
  { state: 'button', type: 'link', name: 'Archivo', icon: 'drive_folder_upload' },
  { state: 'acreedores', type: 'link', name: 'Acreedores', icon: 'request_quote' },
  { state: 'panel', type: 'link', name: 'Panel', icon: 'tune' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
