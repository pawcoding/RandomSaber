import { Directive, HostListener } from '@angular/core'

@Directive({
  selector: '[appStopPropagation]',
})
export class StopPropagationDirective {
  @HostListener('click', ['$event'])
  @HostListener('contextmenu', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation()
  }
}
