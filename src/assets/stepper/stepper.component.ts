import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../app/methode-service.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent  implements OnInit{
  methode : any =null;
  constructor(private methodeService : MethodeServiceService ){

}
ngOnInit() {
  this.methodeService.getMethodes()
    .pipe(
      map((data: any) => data[0]), // Extract the first method from the array
      first() // Ensure we only take the first emitted value
    )
    .subscribe((firstMethode: any) => {
      this.methode = firstMethode;
    });
}
}
