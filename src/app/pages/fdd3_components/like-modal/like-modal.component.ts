import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-like-modal',
  templateUrl: './like-modal.component.html',
  styleUrls: ['./like-modal.component.scss']
})
export class LikeModalComponent {
  submitted: boolean = false; // Flag to manage modal state

  constructor(public dialogRef: MatDialogRef<LikeModalComponent>) {}

  submitFeedback(liked: boolean) {
    // Handle feedback submission here (e.g., send to server or process locally)
    console.log('Feedback:', liked ? 'Liked' : 'Not Liked');
    this.submitted = true; // Change the modal state to show thank you message
  }

  closeDialog() {
    this.dialogRef.close(); // Close the modal
  }
}
