import { Component, OnInit } from "@angular/core";
import { MethodeServiceService } from "../../../methode-service.service";
import { first, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'ngx-fdd',
  templateUrl: './fdd.component.html',
  styleUrls: ['./fdd.component.css']
})
export class FddComponent  implements OnInit{
  methode : any;
  constructor(private dialog: MatDialog,private methodeService : MethodeServiceService ){

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
deleteMethode(id: number) {
  this.methodeService.deleteMethod(id).subscribe(
    () => {
      this.methode.delete(id);
      location.reload();
    },
    (error: any) => {
      throwError(error);
      console.error('Error deleting method:', error);
    }
  );
}
openDeleteConfirmationDialog(id: number): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '300px',
    data: {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this method?',
    },
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleteMethode(id);
    }
  });
}
}