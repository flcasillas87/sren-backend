import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenavOpen = signal<boolean>(true);

  get sidenavOpen$() {
    return this.sidenavOpen;
  }

  toggleSidenav(): void {
    console.log('Toggling sidenav...');
    this.sidenavOpen.set(!this.sidenavOpen());
  }
}