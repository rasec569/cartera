import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'DASHBOARD', type: 'link', icon: 'av_timer' },
  /* { state: 'login', type: 'link', name: 'login', icon: 'monetization_on' }, */
  { state: 'Cartera', type: 'link', name: 'CARTERA', icon: 'card_travel' },
  { state: 'Clientes', type: 'link', name: 'CLIENTES', icon: 'family_restroom' },
  { state: 'Proyectos', type: 'link', name: 'PROYECTOS', icon: 'cases' },
  { state: 'Inmuebles', type: 'link', name: 'INMUEBLES', icon: 'maps_home_work' },
  { state: 'Archivos', type: 'link', name: 'ARCHIVO', icon: 'drive_folder_upload' },
  { state: 'Obligaciones', type: 'link', name: 'OBLIGACIONES', icon: 'request_quote' },
  { state: 'Panel', type: 'link', name: 'PANEL', icon: 'tune' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
