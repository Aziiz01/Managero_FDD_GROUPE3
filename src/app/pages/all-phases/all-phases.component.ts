import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../methode-service.service';
import { Process } from '../phases/process.model';

@Component({
  selector: 'ngx-all-phases',
  templateUrl: './all-phases.component.html',
  styleUrls: ['./all-phases.component.scss']
})
export class AllPhasesComponent implements OnInit {
  processes: Process[] = [];
  expandedProcessId: string | null = null;

  constructor(private methodeService: MethodeServiceService) {}

  ngOnInit() {
    this.loadProcesses();
  }

  loadProcesses() {
    this.methodeService.getProcesses().subscribe(
      (data: Process[]) => {
        this.processes = data;
      },
      error => {
        console.error('Error fetching processes', error);
      }
    );
  }
  deleteProcess(processId :string) {
      this.methodeService.deleteProcess(processId).subscribe(
        () => {
          console.log('Process deleted successfully');
location.reload();
        },
        error => {
          console.error('Error deleting process', error);
        }
      )
    }
  
  toggleDetails(id: string) {
    this.expandedProcessId = this.expandedProcessId === id ? null : id;
  }
}
