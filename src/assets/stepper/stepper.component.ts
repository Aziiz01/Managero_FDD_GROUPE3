import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MethodeServiceService } from '../../app/methode-service.service';
import { first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NbStepperComponent } from '@nebular/theme';
import { LikeModalComponent } from '../../app/like-modal/like-modal.component';
import { PdfExportService } from '../../app/pdf-export.service'; // Import your service

@Component({
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  methode: any = null;
  reviewForm: FormGroup;
  reviews: Array<{ understanding: string, recommendation: string, suggestions: string, editing?: boolean }> = [];
  modalOpened: boolean = false; // Flag to track modal status

  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

  constructor(
    private methodeService: MethodeServiceService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.reviewForm = this.fb.group({
      understanding: ['', Validators.required],
      recommendation: ['', Validators.required],
      suggestions: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.methodeService.getMethodes()
      .pipe(
        map((data: any) => data.length > 0 ? data[0] : null),
        first()
      )
      .subscribe((firstMethode: any) => {
        this.methode = firstMethode;
      });

    setInterval(() => {
      if (this.stepper) {
        const currentIndex = this.stepper.selectedIndex;
        console.log(currentIndex);
        if (currentIndex === 4 && !this.modalOpened) {
          this.openModal();
          this.modalOpened = true;
        }
      }
    }, 1000);
  }

  openModal() {
    this.dialog.open(LikeModalComponent);
  }

  

  addReview() {
    if (this.reviewForm.valid) {
      this.reviews.push({ ...this.reviewForm.value, editing: false });
      this.reviewForm.reset();
    }
  }

  deleteReview(index: number) {
    this.reviews.splice(index, 1);
  }

  editReview(index: number) {
    this.reviews[index].editing = true;
  }

  saveReview(index: number) {
    if (this.reviews[index].understanding && this.reviews[index].recommendation && this.reviews[index].suggestions) {
      this.reviews[index].editing = false;
    }
  }

  cancelEdit(index: number) {
    this.reviews[index].editing = false;
  }
}
