import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../../core/services/FDDG3_services/methode-service.service';
import { SharedService } from '../../../core/services/FDDG3_services/shared.service';

@Component({
  selector: 'ngx-daily-advancement',
  templateUrl: './daily-advancement.component.html',
  styleUrls: ['./daily-advancement.component.scss']
})
export class DailyAdvancementComponent implements OnInit {
  advancementData: any[] = [];
  selectedProcessId: string = '';
  view: [number, number] = [300, 150]; // Line graph dimensions
  private maxRate: number = 0;
  totalDays: number = 0;
  currentRate: number = 0;
  yAxisTicks: number[] = []; // Array to hold Y-axis ticks

  constructor(private methodeService: MethodeServiceService, private sharedService: SharedService) {}

  ngOnInit() {
    // Subscribe to process ID changes
    this.sharedService.selectedProcessId$.subscribe(
      (processId: string | null) => {
        if (processId) {
          this.selectedProcessId = processId;
          this.calculateDailyAdvancementRate();
        }
      }
    );
  }

  calculateDailyAdvancementRate(): void {
    this.methodeService.getProcess(this.selectedProcessId).subscribe(
        (process: any) => {
            if (process) {
                const startDate = new Date(process.startDate);
                const daysSinceStart = Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                const completedTasks = process.done.length;

                this.advancementData = [];
                this.maxRate = 0; // Reset maxRate before calculation

                // Determine sampling interval to limit to 10 points
                const sampleInterval = Math.ceil(daysSinceStart / 10);

                for (let i = 0; i <= daysSinceStart; i++) {
                    if (i % sampleInterval === 0 || i === daysSinceStart) {
                        // Sample every nth point and the last point
                        const rate = i > 0 ? (completedTasks / i) : 0;
                        this.advancementData.push({
                            date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000),
                            rate: rate
                        });
                        if (rate > this.maxRate) {
                            this.maxRate = rate;
                        }
                    }
                }

                // Compute additional properties for the template
                this.totalDays = daysSinceStart;
                this.currentRate = this.advancementData.length > 0 ? this.advancementData[this.advancementData.length - 1].rate : 0;

                // Generate Y-axis ticks
                this.generateYAxisTicks();
            }
        },
        (error) => {
            console.error('Error fetching process data:', error);
        }
    );
}


generateYAxisTicks(): void {
  const tickCount = 5; // Number of ticks to display on Y-axis
  const tickInterval = this.maxRate / tickCount;
  this.yAxisTicks = [];
  
  for (let i = 0; i <= tickCount; i++) {
      // Round to the nearest whole number to avoid similar values
      this.yAxisTicks.push(Math.round(i * tickInterval));
  }
}


  getLinePoints(): string {
    return this.advancementData.map(data => {
      const x = this.getXCoordinate(data.date) + 40; // Adjust for Y-axis offset
      const y = this.getYCoordinate(data.rate);
      return `${x},${y}`;
    }).join(' ');
  }

  getXCoordinate(date: Date): number {
    const startDate = this.advancementData[0]?.date;
    const daysSinceStart = (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return (daysSinceStart / (this.advancementData.length - 1)) * (this.view[0] - 40); // Adjust for Y-axis offset
  }

  getYCoordinate(rate: number): number {
    return this.view[1] - (rate / this.maxRate) * this.view[1];
  }
}
