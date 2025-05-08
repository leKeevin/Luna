import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  ngOnInit(): void {
    this.revealSections(); // Inicializa si ya hay elementos en pantalla
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.revealSections();
  }

  revealSections() {
    const sections = document.querySelectorAll('.scroll-section');
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add('show');
      }
    });
  }
}
