import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SidebarNavService } from '../../../../core/services/sidebar-nav.service';
import { MenuItem } from '../../../../core/models/layout.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css'],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SidebarNavComponent implements OnInit, OnDestroy {
  menuItems$: Observable<MenuItem[]> = this.sidebarNavService.filteredMenuItems$;
  private destroy$ = new Subject<void>();

  constructor(private sidebarNavService: SidebarNavService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('SidebarNavComponent destruido');
  }

  // Métodos que solo interactúan con el servicio
  addMenuItem(): void {
    const newItem: MenuItem = { id: 3, name: 'New Item', icon: 'add', divider: false, url: '', href: '' };
    this.sidebarNavService.addMenuItem(newItem);
  }

  updateMenuItem(id: number): void {
    const updatedItem: MenuItem = { id, name: 'Updated Item', icon: 'edit', divider: false, url: '', href: '' };
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