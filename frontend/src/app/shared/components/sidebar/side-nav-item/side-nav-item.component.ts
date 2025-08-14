import { ChangeDetectionStrategy,Component,  signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavItemComponent {
  // label y ruta como signals readonly
  readonly label = signal('');
  readonly route = signal('');

  // input signal para recibir datos del padre
  set data(item: { label: string; route: string }) {
    this.label.set(item.label);
    this.route.set(item.route);
  }
}
