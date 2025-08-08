import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../models/layout.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Lista de elementos del menú como un BehaviorSubject para permitir la suscripción a cambios
  private readonly menuItemsSubject: BehaviorSubject<MenuItem[]> =
    new BehaviorSubject<MenuItem[]>([
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
  menuItems$: Observable<MenuItem[]> = this.menuItemsSubject.asObservable();

  /**
   * Obtiene los elementos del menú.
   * @returns Un Observable que emite la lista de elementos del menú.
   */
  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems$;
  }

  /**
   * Agrega un nuevo elemento al menú.
   * @param item El nuevo elemento del menú a agregar.
   */
  addMenuItem(item: MenuItem): void {
    const currentItems = this.menuItemsSubject.value;
    this.menuItemsSubject.next([...currentItems, item]);
    this.saveMenuItems(); // Guardar en localStorage después de agregar
  }

  /**
   * Actualiza un elemento del menú existente.
   * @param id El ID del elemento del menú a actualizar.
   * @param updatedItem El elemento del menú actualizado.
   */
  updateMenuItem(id: string | number, updatedItem: MenuItem): void {
    const currentItems = this.menuItemsSubject.value;
    const updatedItems = currentItems.map((item) =>
      item.id === id ? updatedItem : item,
    );
    this.menuItemsSubject.next(updatedItems);
    this.saveMenuItems(); // Guardar en localStorage después de actualizar
  }

  /**
   * Elimina un elemento del menú.
   * @param id El ID del elemento del menú a eliminar.
   */
  deleteMenuItem(id: string | number): void {
    const currentItems = this.menuItemsSubject.value;
    const updatedItems = currentItems.filter((item) => item.id !== id);
    this.menuItemsSubject.next(updatedItems);
    this.saveMenuItems(); // Guardar en localStorage después de eliminar
  }

  /**
   * Guarda los elementos del menú en localStorage.
   */
  saveMenuItems(): void {
    const currentItems = this.menuItemsSubject.value;
    localStorage.setItem('menuItems', JSON.stringify(currentItems));
  }

  /**
   * Carga los elementos del menú desde localStorage.
   */
  loadMenuItems(): void {
    const savedItems = localStorage.getItem('menuItems');
    if (savedItems) {
      const menuItems: MenuItem[] = JSON.parse(savedItems);
      this.menuItemsSubject.next(menuItems);
    }
  }

  /**
   * Filtra los elementos del menú según un criterio.
   * @param predicate La función de criterio de filtrado.
   * @returns Un Observable que emite la lista de elementos del menú filtrados.
   */
  filterMenuItems(
    predicate: (item: MenuItem) => boolean,
  ): Observable<MenuItem[]> {
    return this.menuItems$.pipe(map((items) => items.filter(predicate)));
  }

  /**
   * Busca elementos del menú por nombre.
   * @param searchTerm El término de búsqueda.
   * @returns Un Observable que emite la lista de elementos del menú que coinciden con el término de búsqueda.
   */
  searchMenuItems(searchTerm: string): Observable<MenuItem[]> {
    return this.menuItems$.pipe(
      map((items) =>
        items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      ),
    );
  }
}
