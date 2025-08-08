import { Component } from '@angular/core'; // Importa Component desde Angular core.
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Importa RouterOutlet para la navegación enrutada.

@Component({
  selector: 'app-root', // Define el selector del componente.
  imports: [RouterOutlet], // Importa RouterOutlet para la navegación enrutada.
  templateUrl: './app.component.html', // Define la ruta del archivo de plantilla HTML.
  styleUrls: ['./app.component.css'], // Define la ruta del archivo de estilos CSS.
})
export class AppComponent {
  title = 'SREN'; // Define una propiedad title para el componente.
}
