import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../../core/services/methode-service.service';
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'ngx-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  selectedProcessId: string | null = null;
  featureProgress: number = 0;
  totalFeatures: number = 0;
  implementedFeatures: number = 0;
  chartData: any[] = []; // Chart data for ngx-charts-bar-vertical

  colorScheme = {
    domain: ['#4caf50', '#FF5349'] // Colors for implemented and remaining features
  };

  constructor(
    private methodeService: MethodeServiceService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    // Subscribe to process ID changes
    this.sharedService.selectedProcessId$.subscribe(
      (processId: string | null) => {
        if (processId) {
          this.selectedProcessId = processId;
          this.loadProcessData();
        }
      }
    );
  }

  loadProcessData(): void {
    this.methodeService.getProcesses().subscribe(
      (processes: any[]) => {
        const selectedProcess = processes.find(process => process.idProcess === this.selectedProcessId);
        if (selectedProcess) {
          this.calculateFeatureImplementationProgress(selectedProcess);
        }
      },
      (error) => {
        console.error('Error fetching processes:', error);
      }
    );
  }

  calculateFeatureImplementationProgress(process: any): void {
    this.totalFeatures = process.featureBreakdown.split(',').length;
    this.implementedFeatures = process.featureDescription.split('\n').filter((line: string) => line.includes('done')).length;

    this.featureProgress = this.totalFeatures > 0 ? (this.implementedFeatures / this.totalFeatures) * 100 : 0;

    this.chartData = [
      {
        name: 'Implemented',
        value: this.implementedFeatures
      },
      {
        name: 'Remaining',
        value: this.totalFeatures - this.implementedFeatures
      }
    ];

    console.log(this.chartData); // Debug: Ensure data is correct
  }
}
