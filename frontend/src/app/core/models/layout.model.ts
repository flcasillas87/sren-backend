// Interfaz para el contenido del footer
export interface Link {
  links: {
    id?: string | number;
    url?: string;
    label?: string;
    name?: string;
    href?: string;
    icon?: string;
    iconComponent?: any;
    title?: string;
    variant?: string;
    divider?: boolean;
  }[];
}

// Interfaz para el contenido del footer
export interface FooterContent {
  contactInfo: string;
  links: {
    id?: string | number;
    url?: string;
    label?: string;
    name?: string;
    href?: string;
    icon?: string;
    iconComponent?: any;
    title?: string;
    variant?: string;
    divider?: boolean;
  }[];
  copyright: string;
}


// Otras interfaces relacionadas con el layout pueden ser añadidas aquí
// Ejemplo:
export interface HeaderContent {
  title: string;
  logoUrl: string;
  navLinks: { title: string; url: string }[];
}

export interface MenuItem {
  id: string | number;
  url: string;
  label?: string;
  name: string;
  href: string;
  icon?: string;
  iconComponent?: any; // Si tienes un tipo específico para los componentes de ícono, cámbialo aquí
  title?: string;
  variant?: string;
  divider?: boolean; // Cambié el tipo a booleano para indicar si es un divisor
}
