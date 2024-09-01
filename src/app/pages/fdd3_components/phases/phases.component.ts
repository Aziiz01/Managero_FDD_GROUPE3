import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MethodeServiceService } from '../../../core/services/methode-service.service';
import { Process } from '../../../core/models/process.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {
  overallModelForm: FormGroup;
  featureListForm: FormGroup;
  planByFeatureForm: FormGroup;
  designByFeatureForm: FormGroup;
  buildByFeatureForm: FormGroup;
  processId: string | null = null; // To store the current process ID

  constructor(private router : Router,private fb: FormBuilder, private methodeService: MethodeServiceService) {}

  ngOnInit() {
    this.initializeForms();
    // Optionally, fetch existing data if editing a process
    if (this.processId) {
      this.loadProcess(this.processId);
    }
  }

  initializeForms() {
    this.overallModelForm = this.fb.group({
      domainModelDiagram: [''],
      modelingSessions: ['', Validators.required],
      glossaryTerms: ['', Validators.required],
      architecturalPatterns: ['', Validators.required]
    });

    this.featureListForm = this.fb.group({
      featureIdentification: ['', Validators.required],
      featureBreakdown: ['', Validators.required],
      featurePrioritization: ['', Validators.required],
      featureDescription: ['', Validators.required]
    });

    this.planByFeatureForm = this.fb.group({
      featureOwnership: ['', Validators.required],
      developmentMilestones: ['', Validators.required],
      resourceAllocation: ['', Validators.required],
      riskManagement: ['', Validators.required]
    });

    this.designByFeatureForm = this.fb.group({
      classDiagrams: [''],
      interactionDiagrams: [''],
      designReviewNotes: ['', Validators.required],
      designArtifacts: ['', Validators.required]
    });

    this.buildByFeatureForm = this.fb.group({
      implementationTasks: ['', Validators.required],
      codeRepositoryLinks: ['', Validators.required],
      unitTests: ['', Validators.required],
      codeReviewNotes: ['', Validators.required],
      integrationTestingNotes: ['', Validators.required]
    });
  }

  onFileChange(event: any, formControlName: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result as string;
        this.updateFormControl(formControlName, base64File);
      };
      reader.readAsDataURL(file);
    }
  }

  updateFormControl(controlName: string, value: string) {
    const form = this.getFormByControlName(controlName);
    if (form) {
      form.patchValue({ [controlName]: value });
    }
  }

  getFormByControlName(controlName: string): FormGroup | null {
    switch (true) {
      case this.overallModelForm.controls[controlName] !== undefined:
        return this.overallModelForm;
      case this.featureListForm.controls[controlName] !== undefined:
        return this.featureListForm;
      case this.planByFeatureForm.controls[controlName] !== undefined:
        return this.planByFeatureForm;
      case this.designByFeatureForm.controls[controlName] !== undefined:
        return this.designByFeatureForm;
      case this.buildByFeatureForm.controls[controlName] !== undefined:
        return this.buildByFeatureForm;
      default:
        return null;
    }
  }

  submitForms() {
    if (this.overallModelForm.invalid ||
        this.featureListForm.invalid ||
        this.planByFeatureForm.invalid ||
        this.designByFeatureForm.invalid ||
        this.buildByFeatureForm.invalid) {
      this.markAllAsTouched(); // Mark all fields as touched to display validation errors
      return; // Prevent submission if there are validation errors
    }

    const processData: Process = {
      ...this.overallModelForm.value,
      ...this.featureListForm.value,
      ...this.planByFeatureForm.value,
      ...this.designByFeatureForm.value,
      ...this.buildByFeatureForm.value,
      toDo : [],
      inProgress : [],
      done :[],
      idProcess: this.processId // Include the ID if editing
    };

    if (this.processId) {
      // Update existing process
      this.methodeService.updateProcess(this.processId, processData).subscribe(
        response => {
          console.log('Process updated successfully', response);
        },
        error => {
          console.error('Error updating process', error);
        }
      );
    } else {
      // Create new process
      this.methodeService.createProcess(processData).subscribe(
        response => {
          console.log('Process created successfully', response);
          this.processId = response.idProcess; 
          this.router.navigateByUrl("/pages/AllPhases")
        },
        error => {
          console.error('Error creating process', error);
        }
      );
    }
  }

  markAllAsTouched() {
    Object.values(this.overallModelForm.controls).forEach(control => control.markAsTouched());
    Object.values(this.featureListForm.controls).forEach(control => control.markAsTouched());
    Object.values(this.planByFeatureForm.controls).forEach(control => control.markAsTouched());
    Object.values(this.designByFeatureForm.controls).forEach(control => control.markAsTouched());
    Object.values(this.buildByFeatureForm.controls).forEach(control => control.markAsTouched());
  }

  loadProcess(id: string) {
    this.methodeService.getProcess(id).subscribe(
      (process: Process) => {
        // Populate forms with data
        this.overallModelForm.patchValue(process);
        this.featureListForm.patchValue(process);
        this.planByFeatureForm.patchValue(process);
        this.designByFeatureForm.patchValue(process);
        this.buildByFeatureForm.patchValue(process);
      },
      error => {
        console.error('Error loading process', error);
      }
    );
  }

  deleteProcess() {
    if (this.processId) {
      this.methodeService.deleteProcess(this.processId).subscribe(
        () => {
          console.log('Process deleted successfully');
          // Optionally clear forms or navigate away
        },
        error => {
          console.error('Error deleting process', error);
        }
      );
    }
  }
  viewAll() {
    this.router.navigateByUrl("/pages/AllPhases")
  }
}
