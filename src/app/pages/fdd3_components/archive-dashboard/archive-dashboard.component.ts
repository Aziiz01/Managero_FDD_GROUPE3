import { Component, OnInit } from '@angular/core';
import { Archive } from '../../../core/models/archive.payload';
import { MethodeServiceService } from '../../../core/services/methode-service.service';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-archive-dashboard',
  templateUrl: './archive-dashboard.component.html',
  styleUrls: ['./archive-dashboard.component.scss']
})
export class ArchiveDashboardComponent implements OnInit {
  archives: Archive[] = [];

  constructor(private dialog: MatDialog,private methodeService: MethodeServiceService) {}

  ngOnInit(): void {
    this.getAllArchives();
  }

  getAllArchives(): void {
    this.methodeService.getAllArchives().subscribe((data: Archive[]) => {
      this.archives = data;
    });
  }

  restoreProcess(idArchive: string): void {
    this.methodeService.restoreProcessFromArchive(idArchive).subscribe(() => {
      this.getAllArchives();  // Refresh the archive list
    });
  }

  restoreMethode(idArchive: string): void {
    this.methodeService.restoreMethodeFromArchive(idArchive).subscribe(() => {
      this.getAllArchives();  // Refresh the archive list
    });
  }
  deleteArchive(idArchive: string): void {
    this.methodeService.deleteFromArchive(idArchive).subscribe(() => {
      this.getAllArchives();  // Refresh the archive list
    });
  }
  openDeleteConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this archive?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteArchive(id);
      }
    });
  }
}
