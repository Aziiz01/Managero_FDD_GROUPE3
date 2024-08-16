import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Process } from '../pages/phases/process.model';
import { MethodeServiceService } from '../methode-service.service';

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
    @Inject(MAT_DIALOG_DATA) public data: { process: Process }
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.toDoTasks = JSON.parse(localStorage.getItem('toDoTasks') || '[]');
    this.inProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks') || '[]');
    this.doneTasks = JSON.parse(localStorage.getItem('doneTasks') || '[]');
  }

  addTask(status: 'toDo' | 'inProgress' | 'done', task: string) {
    if (task.trim() === '') return; // Avoid adding empty tasks

    const tasks = this.getTasksByStatus(status);
    tasks.push(task);
    this.saveTasks();

    // Clear input field
    (document.querySelector(`#${status}TaskInput`) as HTMLInputElement).value = '';
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
    localStorage.setItem('toDoTasks', JSON.stringify(this.toDoTasks));
    localStorage.setItem('inProgressTasks', JSON.stringify(this.inProgressTasks));
    localStorage.setItem('doneTasks', JSON.stringify(this.doneTasks));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
