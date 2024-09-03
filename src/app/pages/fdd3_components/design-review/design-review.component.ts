import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../../core/services/FDDG3_services/methode-service.service';
import { SharedService } from '../../../core/services/FDDG3_services/shared.service';

@Component({
  selector: 'ngx-design-review',
  templateUrl: './design-review.component.html',
  styleUrls: ['./design-review.component.scss']
})
export class DesignReviewComponent implements OnInit {
  chartData: any[] = [];
  totalIssues: number = 0;
  resolvedIssues: number = 0;
  designReviewProgress: number = 0;
  selectedProcessId: string = '';
  view: [number, number] = [400, 400]; // Chart dimensions
  colorScheme = {
    domain: ['#4caf50', '#FF5349'] // Colors for resolved and unresolved issues
  };

  constructor(private methodeService: MethodeServiceService, private sharedService: SharedService) {}

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
          this.calculateDesignReviewEffectiveness(selectedProcess);
        }
      },
      (error) => {
        console.error('Error fetching processes:', error);
      }
    );
  }

  calculateDesignReviewEffectiveness(process: any): void {
    this.totalIssues = process.designReviewNotes.split(',').length;
    this.resolvedIssues = process.designReviewNotes.split('\n').filter((line: string) => line.includes('resolved')).length;

    // Calculate the progress percentage
    this.designReviewProgress = (this.resolvedIssues / this.totalIssues) * 100;
  }

  getProgressBarColor(progress: number): string {
    if (progress >= 75) {
      return '#4caf50'; // Green for high progress
    } else if (progress >= 50) {
      return '#ffeb3b'; // Yellow for medium progress
    } else {
      return '#FF5349'; // Red for low progress
    }
  }
}
