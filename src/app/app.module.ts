/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbAccordionModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbStepperModule,
  NbToastrModule,
  NbWindowModule, NbThemeModule, NbLayoutModule,
} from '@nebular/theme';
import { FddComponent } from './pages/agile/fdd/fdd.component';
import { StepperComponent } from '../assets/stepper/stepper.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LikeModalComponent } from './like-modal/like-modal.component';
import { PhasesComponent } from './pages/phases/phases.component';
import { AllPhasesComponent } from './pages/all-phases/all-phases.component';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
import { TaskCompletionRateComponent } from './task-completion-rate/task-completion-rate.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressComponent } from './progress/progress.component';
import { DesignReviewComponent } from './design-review/design-review.component';
import { DailyAdvancementComponent } from './daily-advancement/daily-advancement.component';
import { RiskDetectionRateComponent } from './risk-detection-rate/risk-detection-rate.component';

@NgModule({
  declarations: [AppComponent, StepperComponent,FddComponent, ConfirmationDialogComponent, EditdialogComponent, LikeModalComponent, PhasesComponent, AllPhasesComponent, ProgressDialogComponent, TaskCompletionRateComponent, StatisticsComponent, ProgressComponent, DesignReviewComponent, DailyAdvancementComponent, RiskDetectionRateComponent],
  imports: [
    NgxChartsModule,
    NbStepperModule,
    RouterModule,
    NbAccordionModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {
}
