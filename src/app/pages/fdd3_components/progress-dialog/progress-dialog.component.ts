import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Process } from '../../../core/models/FDDG3_models/process.model';
import { MethodeServiceService } from '../../../core/services/FDDG3_services/methode-service.service';

@Component({
  selector: 'ngx-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.scss']
})
export class ProgressDialogComponent implements OnInit {
  toDoTasks: string[] = [];
  inProgressTasks: string[] = [];
  doneTasks: string[] = [];

  constructor(
    private methodeService: MethodeServiceService,
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Process // Directly typecast to Process
  ) {}

  ngOnInit() {
    if (this.data) {
      this.loadTasks();
    } else {
      console.error('No process data provided');
    }
  }

  loadTasks() {
    if (this.data) {
      // Directly access the properties of the data
      this.toDoTasks = this.data.toDo || [];
      this.inProgressTasks = this.data.inProgress || [];
      this.doneTasks = this.data.done || [];
    }
  }

  addTask(status: 'toDo' | 'inProgress' | 'done', task: string) {
    if (task.trim() === '') return; // Avoid adding empty tasks

    const tasks = this.getTasksByStatus(status);
    tasks.push(task);
    this.saveTasks();
  }

  deleteTask(status: 'toDo' | 'inProgress' | 'done', task: string) {
    const tasks = this.getTasksByStatus(status);
    const index = tasks.indexOf(task);

    if (index > -1) {
      tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  getTasksByStatus(status: 'toDo' | 'inProgress' | 'done'): string[] {
    switch (status) {
      case 'toDo': return this.toDoTasks;
      case 'inProgress': return this.inProgressTasks;
      case 'done': return this.doneTasks;
      default: return [];
    }
  }

  saveTasks() {
    if (this.data) {
      const updatedProcess: Process = {
        ...this.data,
        toDo: this.toDoTasks,
        inProgress: this.inProgressTasks,
        done: this.doneTasks
      };

      this.methodeService.updateProcess(this.data.idProcess,updatedProcess).subscribe(
        () => {
          console.log('Process updated successfully');
        },
        (error) => {
          console.error('Error updating process:', error);
        }
      );
    } else {
      console.error('Process data is not defined');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
