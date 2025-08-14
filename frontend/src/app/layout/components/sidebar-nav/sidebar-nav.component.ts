@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sidebar-nav',
  standalone: true,
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ],
})
export class SidebarNavComponent {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
    }, { inject: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });
  }

  constructor() {
    effect(
      () => {
        destroyRef;
      },
      { injector: this.destroyRef },
    );
  }

  constructor() {
    effect(
      () => {
        destroyRef;
      },
      { injector: this.destroyRef },
    );
  }

  private destroyRef = inject(DestroyRef);
  menuItems$: Observable<MenuItem[]> =
    this.sidebarNavService.filteredMenuItems$;
  private destroy$ = new Subject<void>();

  constructor(private sidebarNavService: SidebarNavService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('SidebarNavComponent destruido');
  }

  // Métodos que solo interactúan con el servicio
  addMenuItem(): void {
    const newItem: MenuItem = {
      id: 3,
      name: 'New Item',
      icon: 'add',
      divider: false,
      url: '',
      href: '',
    };
    this.sidebarNavService.addMenuItem(newItem);
  }

  updateMenuItem(id: number): void {
    const updatedItem: MenuItem = {
      id,
      name: 'Updated Item',
      icon: 'edit',
      divider: false,
      url: '',
      href: '',
    };
    this.sidebarNavService.updateMenuItem(id, updatedItem);
  }

  deleteMenuItem(id: number): void {
    this.sidebarNavService.deleteMenuItem(id);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.sidebarNavService.searchMenuItems(input.value);
  }
}













import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '..';
import { Observable, Subject } from 'rxjs';
import { SidebarNavService } from '../../sidebar-nav.service';
import { takeUntil } from 'rxjs/operators';
