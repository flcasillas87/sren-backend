@Injectable({ providedIn: 'root' })
export class FooterContentService {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });
  }

  private destroyRef = inject(DestroyRef);
  // ✅ Señal readonly con tipo explícito
  private readonly footerContent: ReturnType<typeof signal<FooterContent>> = signal<FooterContent>({
    contactInfo: 'Dirección: 123 Calle Principal, Ciudad',
    links: [
      { title: 'Inicio', url: '/', icon: 'home' },
      { title: 'Acerca de nosotros', url: '/about', icon: 'info' },
      { title: 'Contacto', url: '/contact', icon: 'contact_mail' },
      { title: 'Dashboard', url: '/Dasboard', icon: 'dashboard' },
    ],
    copyright: '© 2025 Todos los derechos reservados.',
  });

  // ✅ Computed con tipo explícito
  readonly footerContent$: Computed<FooterContent> = computed(() => this.footerContent());

  // ✅ Métodos con tipo de retorno
  updateLinks(links: FooterContent['links']): void {
    this.footerContent.update((current) => ({ ...current, links }));
  }

  updateContactInfo(info: string): void {
    this.footerContent.update((current) => ({ ...current, contactInfo: info }));
  }

  getFooterContent(): Computed<FooterContent> {
    return this.footerContent$;
  }
}




import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FooterContent } from '../models/layout.model';
