import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWidget]'
})
export class WidgetDirective {

  constructor(public viewContainer: ViewContainerRef) { }

}
