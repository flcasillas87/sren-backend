import { ChangeDetectionStrategy,Component,signal } from '@angular/core';

@Component({
  selector: 'app-header-search',
  standalone: true,
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearchComponent {
  searchTerm = signal('');
}
