// Importación de componentes




@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    AsyncPipe,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterOutlet,
    SidebarComponent
  ],
})
export class LayoutComponent {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
      breakpointObserver;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
      breakpointObserver;
    }, { injector: this.destroyRef });
  }

  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);

  // Detecta el tamaño de la pantalla y ajusta el comportamiento del sidenav
  readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  isSidenavOpen = true;

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}

















import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { HeaderComponent } from '../components/header.component';
import { map, shareReplay } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../sidebar/components/sidebar.component';
