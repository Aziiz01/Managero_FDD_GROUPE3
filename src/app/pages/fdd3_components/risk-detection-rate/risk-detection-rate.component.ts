import { Component, OnInit, HostListener } from '@angular/core';
import { MethodeServiceService } from '../../../core/services/methode-service.service';
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'ngx-risk-detection-rate',
  templateUrl: './risk-detection-rate.component.html',
  styleUrls: ['./risk-detection-rate.component.scss']
})
export class RiskDetectionRateComponent implements OnInit {
  selectedProcessId: string | null = null;
  totalRisks: number = 0;
  detectedRisks: number = 0;
  riskDetectionRate: number = 0;
  chartData: any[] = [];

  view: [number, number] = [800, 400]; // Default chart dimensions
  colorScheme = {
    domain: ['#ff6347', '#90ee90'] // Colors for detected and remaining risks
  };

  constructor(
    private methodeService: MethodeServiceService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.updateChartView(); // Set initial view size
    this.sharedService.selectedProcessId$.subscribe(
      (processId: string | null) => {
        if (processId) {
          this.selectedProcessId = processId;
          this.loadProcessData();
        }
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartView();
  }

  updateChartView() {
    const width = window.innerWidth * 0.6; // 80% of window width
    const height = 280; // Fixed height
    this.view = [width, height];
  }

  loadProcessData(): void {
    this.methodeService.getProcesses().subscribe(
      (processes: any[]) => {
        const selectedProcess = processes.find(process => process.idProcess === this.selectedProcessId);
        if (selectedProcess) {
          this.calculateRiskDetectionRate(selectedProcess);
        }
      },
      (error) => {
        console.error('Error fetching processes:', error);
      }
    );
  }

  calculateRiskDetectionRate(process: any): void {
    this.totalRisks = process.riskManagement.split(',').length;
    this.detectedRisks = this.totalRisks > 0 ? Math.floor(this.totalRisks * 0.7) : 0;
    this.riskDetectionRate = this.totalRisks > 0 ? (this.detectedRisks / this.totalRisks) * 100 : 0;
    this.chartData = [
      {
        name: 'Detected Risks',
        value: this.detectedRisks
      },
      {
        name: 'Remaining Risks',
        value: this.totalRisks - this.detectedRisks
      }
    ];
  }
}
