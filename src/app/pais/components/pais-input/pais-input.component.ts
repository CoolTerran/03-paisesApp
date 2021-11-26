import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{


  @Output() onEnter   : EventEmitter<string> = new EventEmitter(); //eventos generalmente se nombran empezando con 'on'
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); //aqui es cuando se deja de escribir

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject(); //Subject es un observable

  termino: string = '';

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
      this.onDebounce.emit(valor);
    })
  }


  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {

    this.debouncer.next(this.termino);


  }

}
