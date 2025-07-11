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
import { FddComponent } from './pages/fdd3_components/fdd/fdd.component';
import { StepperComponent } from './pages/fdd3_components/stepper/stepper.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './pages/fdd3_components/confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { EditComponent } from './pages/fdd3_components/edit/edit.component';
import { EditdialogComponent } from './pages/fdd3_components/editdialog/editdialog.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LikeModalComponent } from './pages/fdd3_components/like-modal/like-modal.component';
import { PhasesComponent } from './pages/fdd3_components/phases/phases.component';
import { AllPhasesComponent } from './pages/fdd3_components/all-phases/all-phases.component';
import { ProgressDialogComponent } from './pages/fdd3_components/progress-dialog/progress-dialog.component';
import { TaskCompletionRateComponent } from './pages/fdd3_components/task-completion-rate/task-completion-rate.component';
import { StatisticsComponent } from './pages/fdd3_components/statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressComponent } from './pages/fdd3_components/progress/progress.component';
import { DesignReviewComponent } from './pages/fdd3_components/design-review/design-review.component';
import { DailyAdvancementComponent } from './pages/fdd3_components/daily-advancement/daily-advancement.component';
import { RiskDetectionRateComponent } from './pages/fdd3_components/risk-detection-rate/risk-detection-rate.component';

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
