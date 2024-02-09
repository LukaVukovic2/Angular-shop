import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'bolder'
})

export class BoldTextPipe implements PipeTransform{
  transform(text: string): string {
    return `<b>${text}</b>`;
  }
}