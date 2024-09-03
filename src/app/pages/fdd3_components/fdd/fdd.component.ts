import { Component, OnInit } from "@angular/core";
import { MethodeServiceService } from "../../../core/services/FDDG3_services/methode-service.service";
import { first, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { Router, NavigationExtras } from '@angular/router';
import { PdfExportService } from "../../../core/services/FDDG3_services/pdf-export.service";

@Component({
  selector: 'ngx-fdd',
  templateUrl: './fdd.component.html',
  styleUrls: ['./fdd.component.css']
})
export class FddComponent implements OnInit {
  methode: any;
  startedEditing: boolean = false;

  constructor(private dialog: MatDialog, private methodeService: MethodeServiceService, private router: Router,private pdfExportService: PdfExportService ) {}

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

  archiveMethode(id: string) {
    this.methodeService.addMethodeToArchive(id).subscribe(
      () => {
        // Update your data or UI as necessary
        location.reload(); // Consider better ways to update UI or data
      },
      (error: any) => {
        throwError(error);
        console.error('Error archiving method:', error);
      }
    );
  }
  exportMethodeAsPDF() {
    if (this.methode) {
      this.pdfExportService.exportMethodeToPDF(this.methode, 'methodes.pdf');
    }
  }
  openDeleteConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to send this method to the archive?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.archiveMethode(id);
      }
    });
  }
  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Edit',
        message: 'Are you sure you want to edit this method?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/pages/edit');
      }
    });
  }
  startEditing() {
    // Assuming this.methode is the object you want to pass
    

    this.router.navigateByUrl('/pages/edit');
  }
}
