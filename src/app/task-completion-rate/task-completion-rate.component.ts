import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../methode-service.service';

@Component({
  selector: 'ngx-task-completion-rate',
  templateUrl: './task-completion-rate.component.html',
  styleUrls: ['./task-completion-rate.component.scss']
})
export class TaskCompletionRateComponent implements OnInit {
  processes: any[] = []; // Store list of processes
  selectedProcessId: string = '';
  taskCompletionRate: number = 0;
  chartData: any[] = [];
  colorScheme = {
    domain: ['#4caf50', '#e0e0e0']
  };

  constructor(private methodeService: MethodeServiceService) {}

  ngOnInit(): void {
    this.loadProcesses();
  }

  loadProcesses(): void {
    this.methodeService.getProcesses().subscribe(
      (processes: any[]) => {
        this.processes = processes;
        if (this.processes.length > 0) {
          this.selectedProcessId = this.processes[0].idProcess;
          this.getTaskCompletionRate();
        }
      },
      (error) => {
        console.error('Error fetching processes:', error);
      }
    );
  }

  onProcessChange(processId: string): void {
    this.selectedProcessId = processId;
    this.getTaskCompletionRate();
  }

  getTaskCompletionRate(): void {
    this.methodeService.getTaskCompletionRate(this.selectedProcessId).subscribe(
      (rate: number) => {
        this.taskCompletionRate = rate;
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching Task Completion Rate:', error);
      }
    );
  }

  updateChartData(): void {
    this.chartData = [
      {
        name: 'Completed',
        value: this.taskCompletionRate
      },
      {
        name: 'Remaining',
        value: 100 - this.taskCompletionRate
      }
    ];
  }
}
