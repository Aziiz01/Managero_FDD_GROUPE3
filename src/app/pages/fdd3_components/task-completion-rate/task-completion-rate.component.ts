import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../../core/services/FDDG3_services/methode-service.service';
import { SharedService } from '../../../core/services/FDDG3_services/shared.service';

@Component({
  selector: 'ngx-task-completion-rate',
  templateUrl: './task-completion-rate.component.html',
  styleUrls: ['./task-completion-rate.component.scss']
})
export class TaskCompletionRateComponent implements OnInit {
  selectedProcessId: string | null = null;
  taskCompletionRate: number = 0;
  chartData: any[] = [];
  colorScheme = {
    domain: ['#4caf50', '#FF5349']
  };

  constructor(
    private methodeService: MethodeServiceService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // Subscribe to process ID changes
    this.sharedService.selectedProcessId$.subscribe(
      (processId: string | null) => {
        this.selectedProcessId = processId;
        if (this.selectedProcessId) {
          this.getTaskCompletionRate();
        }
      }
    );
  }

  getTaskCompletionRate(): void {
    if (!this.selectedProcessId) {
      return;
    }

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
