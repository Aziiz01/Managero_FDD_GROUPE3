import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../../core/services/FDDG3_services/methode-service.service';
import { SharedService } from '../../../core/services/FDDG3_services/shared.service';

@Component({
  selector: 'ngx-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  processes: any[] = [];
  selectedProcessId: string = '';
  count: number = 0;
  doneTasksCount: number = 0;
  toDoTasksCount: number = 0;

  constructor(private sharedService: SharedService, private methodeService: MethodeServiceService) {}

  ngOnInit() {
    this.loadProcesses();
  }
  getIndices(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
  loadProcesses(): void {
    this.methodeService.getProcesses().subscribe(
      (processes: any[]) => {
        this.processes = processes;
        this.count = processes.length;
        this.doneTasksCount = this.calculateDoneTasks(processes);
        this.toDoTasksCount = (this.calculateToDoTasks(processes)+ this.calculateInProgress(processes));

        if (this.processes.length > 0) {
          this.selectedProcessId = this.processes[0].idProcess;
          this.onProcessChange();
        }
      },
      (error) => {
        console.error('Error fetching processes:', error);
      }
    );
  }

  calculateDoneTasks(processes: any[]): number {
    return processes.reduce((total, process) => {
      if (process.done) {
        return total + process.done.length;
      }
      return total;
    }, 0);
  }

  calculateToDoTasks(processes: any[]): number {
    return processes.reduce((total, process) => {
      if (process.toDo) {
        return total + process.toDo.length;
      }
      return total;
    }, 0);
  }
  calculateInProgress(processes: any[]): number {
    return processes.reduce((total, process) => {
      if (process.inProgress) {
        return total + process.inProgress.length;
      }
      return total;
    }, 0);
  }
  onProcessChange(): void {
    this.sharedService.setSelectedProcessId(this.selectedProcessId);
  }
}
