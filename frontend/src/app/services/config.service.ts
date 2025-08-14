@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly config = signal<Record<string, any>>({});

  readonly config$ = computed(() => this.config());

  setConfig(key: string, value: any): void {
    this.config.update(c => ({ ...c, [key]: value }));
  }

  getConfig(key: string): any {
    return this.config()[key];
  }
}


import { computed, Injectable, signal } from '@angular/core';
