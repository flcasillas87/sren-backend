import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-header-brand',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './header-brand.component.html',
  styleUrl: './header-brand.component.css'
})
export class HeaderBrandComponent {

}
