import { Component } from '@angular/core';

import { HeaderBrandComponent } from './header-brand/header-brand.component';
import { HeaderDividerComponent } from './header-divider/header-divider.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HeaderTextComponent } from './header-text/header-text.component';
import { HeaderTogglerComponent } from './header-toggler/header-toggler.component';

type Container = boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderBrandComponent,
    HeaderDividerComponent,
    HeaderLogoComponent,
    HeaderNavComponent,
    HeaderSearchComponent,
    HeaderTextComponent,
    HeaderTogglerComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
