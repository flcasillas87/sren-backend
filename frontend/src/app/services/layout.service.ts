import { Injectable, signal, computed } from '@angular/core';
import { FooterContent } from '../core/models/layout.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}

// FooterContentService
@Injectable({
  providedIn: 'root',
})
export class FooterContentService {
  private footerContent = signal<FooterContent>({
    contactInfo: 'Dirección: 123 Calle Principal, Ciudad',
    links: [
      { title: 'Inicio', url: '/', icon: 'home' },
      { title: 'Acerca de nosotros', url: '/about', icon: 'info' },
      { title: 'Contacto', url: '/contact', icon: 'contact_mail' },
      { title: 'Dashboard', url: '/Dasboard', icon: 'dashboard' },
      /*{
        id:  ,
        url: 'string',
        label: 'string',
        name: 'string',
        href: 'string',
        icon: 'string',
        iconComponent: 'any'; // Si tienes un tipo específico para los componentes de ícono, cámbialo aquí
        title: 'string',
        variant: 'string',
        divider: 'boolean', // Cambié el tipo a booleano para indicar si es un divisor
      }*/
    ],
    copyright: '© 2025 Todos los derechos reservados.',
  });

  // Método para obtener el contenido del pie de página
  getFooterContent() {
    console.log('Obteniendo contenido del footer...');
    console.log(this.footerContent()); // Devuelve los datos del signal
    return computed(() => this.footerContent()); // Computed que devuelve los datos del signal
  }
}
