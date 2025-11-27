import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
//   styles: `.is-command{
//   @apply bg-indigo-700 bg-opacity-20
// }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',

  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent)

 /*  get resultText() {
    return this.calculatorService.resultText
  } */


 public resultText = computed (()=> this.calculatorService.resultText());
 public subResultText = computed (()=> this.calculatorService.subResultText());
 public lastOperator = computed (()=> this.calculatorService.lastOperator());

  handleClick(key: string) {
    console.log( {key} )
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent( event: KeyboardEvent ) {

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear:  'C',
      '*': 'X',
      '/' : '÷',
      Enter: '='
    }

    const key = event.key
    const keyValue = keyEquivalents[key] ?? key

    this.handleClick(keyValue)

    this.calculatorButtons().forEach(button =>{
      button.keyWordPressedStyle(keyValue)
    })

  }
}
