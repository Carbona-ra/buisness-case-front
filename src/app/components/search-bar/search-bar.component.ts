import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  // Déclaration du formulaire
  form: FormGroup;

  // Événement pour transmettre les valeurs du formulaire au composant parent
  @Output() formSubmitted = new EventEmitter<{ price: number; slot: number; place: string }>();

  ngOnInit(): void {
    this.form = new FormGroup({
      price: new FormControl(null),
      slot: new FormControl(null),
      place: new FormControl(null)
    });
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      // Récupération des valeurs du formulaire
      const { price, slot, place } = this.form.value;
      
      // Émission des valeurs au composant parent
      this.formSubmitted.emit({ price, slot, place });
    }
  }
}
