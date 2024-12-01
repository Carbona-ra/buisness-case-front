import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
 
  @ViewChild('sliderContainer', { static: false }) sliderContainer: ElementRef | undefined;
  currentIndex = 0;

  ngAfterViewInit() {
    // Calculer le nombre total d'éléments dans le slider
    if (this.sliderContainer) {
      this.updateSliderPosition();
    }
  }

  updateSliderPosition() {
    if (this.sliderContainer) {
      // Ici, on cast l'élément en HTMLElement pour accéder à 'offsetWidth'
      const slideWidth = (this.sliderContainer.nativeElement.children[0] as HTMLElement).offsetWidth + 32; // Largeur avec marges (16px de chaque côté de "mx-2")
      const transformValue = `translateX(-${this.currentIndex * slideWidth}px)`;
      this.sliderContainer.nativeElement.style.transform = transformValue;
    }
  }


  nextSlide() {
    if (this.sliderContainer) {
      const slideCount = this.sliderContainer.nativeElement.children.length;
      if (this.currentIndex < slideCount - 1) {
        this.currentIndex++;
        this.updateSliderPosition();
      }
    }
  }

  prevSlide() {
    if (this.sliderContainer) {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateSliderPosition();
      }
    }
  }
}
