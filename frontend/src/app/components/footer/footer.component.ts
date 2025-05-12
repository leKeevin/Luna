import { Component, OnInit, HostListener,ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isVisible = false;
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  console.log("Hola")
  }

  
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const footer = this.elRef.nativeElement.querySelector('footer');

    // ✅ Solo mostrar el footer, sin cambiar la posición de desplazamiento
    if (scrollTop + windowHeight >= docHeight - 5) { // Reducimos margen a 5px
      footer.classList.add('show'); // Muestra el footer
    } else {
      footer.classList.remove('show'); // Oculta el footer
    }
  }
}
