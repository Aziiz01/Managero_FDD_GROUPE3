import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../../core/services/methode-service.service';
import { Process } from '../../../core/models/process.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component';

@Component({
  selector: 'ngx-all-phases',
  templateUrl: './all-phases.component.html',
  styleUrls: ['./all-phases.component.scss']
})
export class AllPhasesComponent implements OnInit {
  processes: Process[] = [];
  expandedProcessId: string | null = null;
  editMode: string | null = null;

  constructor(private dialog: MatDialog, private methodeService: MethodeServiceService) {}

  ngOnInit() {
    this.loadProcesses();
  }

  loadProcesses() {
    this.methodeService.getProcesses().subscribe(
      (data: Process[]) => {
        this.processes = data.map(p => ({
          ...p,
          toDo: p.toDo || [],        // Ensure these are initialized as empty arrays
          inProgress: p.inProgress || [],
          done: p.done || [],
        }));
      },
      error => {
        console.error('Error fetching processes', error);
      }
    );
  }
  

  openDeleteConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to send this process to the archive?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.archiveProcess(id);
      }
    });
  }

  archiveProcess(processId: string) {
    this.methodeService.addProcessToArchive(processId).subscribe(
      () => {
        console.log('Process archived successfully');
        location.reload();
      },
      error => {
        console.error('Error archiving process', error);
      }
    );
  }

  toggleDetails(id: string) {
    this.expandedProcessId = this.expandedProcessId === id ? null : id;
  }

  toggleEditMode(id: string | null) {
    this.editMode = id;
  }

  onFileSelected(event: any, field: keyof Process): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const processIndex = this.processes.findIndex(p => p.idProcess === this.expandedProcessId);
  
        if (processIndex !== -1) {
          const process = this.processes[processIndex];
          
          // Check if the field is an array
          if (Array.isArray(process[field])) {
            (process[field] as string[]).push(base64String);
          } else {
            console.error(`Field '${field}' is not an array or is not properly initialized.`);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  updateProcess(process: Process) {
    this.methodeService.updateProcess(process.idProcess, process).subscribe(
      () => {
        console.log('Process updated successfully');
        this.editMode = null;
      },
      error => {
        console.error('Error updating process', error);
      }
    );
  }

  openProgressDialog(process: Process): void {
    const dialogRef = this.dialog.open(ProgressDialogComponent, {
      width: '600px',
      data: process
    });
console.log(process)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProcess(result);
      }
    });
  }
}
