import { Component } from '@angular/core';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarHeaderComponent, SidebarNavComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  
}
