import { Directive, HostListener } from '@angular/core'

@Directive({
  selector: '[appPreventDefault]',
})
export class PreventDefaultDirective {
  @HostListener('click', ['$event'])
  @HostListener('contextmenu', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault()
  }
}
