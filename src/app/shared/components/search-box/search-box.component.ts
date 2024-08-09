import { Component, Input, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //atributos para utilizar en la busqueda de información.
  private debouncer: Subject<string>= new Subject<string>();
  private debouncerSubscription?: Subscription;


  @Input()
  public initialValue: string='';

  @Input()
  public placeholder: string='';

  //Variable pública que permite hacer eventos de tipo string
  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  //Metodos
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        //en la busqeuda esperará estos segundos hasta que termine de escribir
        debounceTime(300)
      )
      .subscribe(value=>{
        this.onDebounce.emit(value);
      })
  }

  //Funcion EmitValue, permite buscar al momento de escribir
  emitValue(value:string):void{
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm:string):void{
    this.debouncer.next(searchTerm);
  }

  //limpiar los componentes de la página
  ngOnDestroy(): void{
    this.debouncerSubscription?.unsubscribe();
  }
}
