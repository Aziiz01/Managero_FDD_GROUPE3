import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { NbStepperModule } from '@nebular/theme';
import { throwError } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { methodePayload } from '../../../core/models/FDDG3_models/methode.payload';
import { MethodeServiceService } from '../../../core/services/FDDG3_services/methode-service.service';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [AngularEditorModule , NbStepperModule, ReactiveFormsModule, FormsModule]  // Ensure this is an array

})
export class EditComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      }
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  createMethodeForm : FormGroup;
  methodePayload : methodePayload;
  methode : any;
  passed_methode : any;
constructor(private router : Router,private methodeService : MethodeServiceService,private route: ActivatedRoute ){
this.createMethodeForm = new FormGroup({
  introduction : new FormControl('',Validators.required),
  why : new FormControl('',Validators.required),
    what : new FormControl('',Validators.required),
    how : new FormControl('',Validators.required),
    whatif: new FormControl('',Validators.required),
    conclusion: new FormControl('',Validators.required)

})
this.methodePayload = {
  introduction: '',
  why: '',
  what: '',
  how:'',
  whatif: '',
  conclusion :''
};
}
ngOnInit() {
 
   this.methodeService.getMethodes()
    .pipe(
      map((data: any) => data[0]), // Extract the first method from the array
      first() // Ensure we only take the first emitted value
    )
    .subscribe((firstMethode: any) => {
      this.methode = firstMethode;
    });
}
updateMethode() {
  const introductionControl = this.createMethodeForm.get('introduction');
  const whyControl = this.createMethodeForm.get('why');
  const whatControl = this.createMethodeForm.get('what');
  const howControl = this.createMethodeForm.get('how');
  const whatifControl = this.createMethodeForm.get('whatif');
  const conclusionControl = this.createMethodeForm.get('conclusion');

  this.methodePayload.introduction = introductionControl?.value || '';
  this.methodePayload.why = whyControl?.value || '';
  this.methodePayload.what = whatControl?.value || '';
  this.methodePayload.how = howControl?.value || '';
  this.methodePayload.whatif = whatifControl?.value || '';
  this.methodePayload.conclusion = conclusionControl?.value || '';

  this.methodeService.updateMethod(this.methode.idMethode,this.methodePayload).subscribe(
    data => {
      if (data === null) {
        console.log("data is null error");
      } else {
        this.router.navigateByUrl('/pages/fdd');
      }
    },
    error => {
      console.log(error);
      if (error.error === null) {
        console.log("Error 555: Invalid content");
      }
      throwError(error);
      console.error('Error updating methode:', error);
    }
  );
}


}
