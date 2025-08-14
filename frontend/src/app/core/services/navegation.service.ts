import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuItem } from '../models/layout.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Lista de elementos del menú como un BehaviorSubject para permitir la suscripción a cambios
  private readonly menuItemsSubject = new BehaviorSubject<MenuItem[]>([
    {
      id: 0,
      url: 'admin',
      label: 'Admin',
      name: 'Admin',
      href: '',
      icon: 'home',
      divider: true,
    },
    {
      id: 1,
      url: 'dashboard',
      label: 'Dashboard',
      name: 'Dashboard',
      href: '',
      icon: 'newspaper',
      divider: true,
    },
    {
      id: 2,
      url: 'table',
      label: 'Tablas',
      name: 'Tablas',
      href: '',
      icon: 'monitoring',
      divider: true,
    },
    {
      id: 3,
      url: 'card',
      label: 'Card',
      name: 'Card',
      href: '',
      icon: 'monitoring',
      divider: true,
    },
  ]);

  // Observable para exponer los elementos del menú
  readonly menuItems$: Observable<MenuItem[]> =
    this.menuItemsSubject.asObservable();

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems$;
  }

  addMenuItem(item: MenuItem): void {
    const currentItems = this.menuItemsSubject.value;
    this.menuItemsSubject.next([...currentItems, item]);
    this.saveMenuItems();
  }

  updateMenuItem(id: string | number, updatedItem: MenuItem): void {
    const updatedItems = this.menuItemsSubject.value.map((item) =>
      item.id === id ? updatedItem : item
    );
    this.menuItemsSubject.next(updatedItems);
    this.saveMenuItems();
  }

  deleteMenuItem(id: string | number): void {
    const updatedItems = this.menuItemsSubject.value.filter(
      (item) => item.id !== id
    );
    this.menuItemsSubject.next(updatedItems);
    this.saveMenuItems();
  }

  saveMenuItems(): void {
    localStorage.setItem(
      'menuItems',
      JSON.stringify(this.menuItemsSubject.value)
    );
  }

  loadMenuItems(): void {
    const savedItems = localStorage.getItem('menuItems');
    if (savedItems) {
      this.menuItemsSubject.next(JSON.parse(savedItems));
    }
  }

  filterMenuItems(
    predicate: (item: MenuItem) => boolean
  ): Observable<MenuItem[]> {
    return this.menuItems$.pipe(map((items) => items.filter(predicate)));
  }

  searchMenuItems(searchTerm: string): Observable<MenuItem[]> {
    return this.menuItems$.pipe(
      map((items) =>
        items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
}





