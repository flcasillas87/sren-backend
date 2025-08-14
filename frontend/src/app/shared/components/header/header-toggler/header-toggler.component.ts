import { ChangeDetectionStrategy, Component,  output } from '@angular/core';

@Component({
  selector: 'app-header-toggler', // coincide con el archivo y uso
  standalone: true,
  templateUrl: './header-toggler.component.html',
  styleUrls: ['./header-toggler.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderTogglerComponent {
  // Output como signal, readonly
readonly sidebarToggle = output<void>();

  onSidebarToggle(): void {
  this.sidebarToggle.emit();
  }
}

