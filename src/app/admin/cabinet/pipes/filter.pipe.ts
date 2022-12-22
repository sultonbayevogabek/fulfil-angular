import { Pipe, PipeTransform } from '@angular/core';
import { IRegistration } from '../../shared/models/models';

@Pipe({
   name: 'filter'
})

export class FilterPipe implements PipeTransform {
   transform(registrations: IRegistration[], status: string): IRegistration[] {
      return registrations.filter(registration => registration.status === status);
   }
}
