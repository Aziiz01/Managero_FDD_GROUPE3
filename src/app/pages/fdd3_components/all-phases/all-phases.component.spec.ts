import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllPhasesComponent } from './all-phases.component';
import { MethodeServiceService } from '../../../core/services/methode-service.service';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Process } from '../../../core/models/process.model';

describe('AllPhasesComponent', () => {
  let component: AllPhasesComponent;
  let fixture: ComponentFixture<AllPhasesComponent>;
  let methodeServiceSpy: jasmine.SpyObj<MethodeServiceService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const methodeServiceMock = jasmine.createSpyObj('MethodeServiceService', ['getProcesses', 'deleteProcess']);
    const matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AllPhasesComponent],
      providers: [
        { provide: MethodeServiceService, useValue: methodeServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllPhasesComponent);
    component = fixture.componentInstance;
    methodeServiceSpy = TestBed.inject(MethodeServiceService) as jasmine.SpyObj<MethodeServiceService>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load processes on init', () => {
    const mockProcesses = [{ idProcess: '1', name: 'Test Process' } as Process];
    methodeServiceSpy.getProcesses.and.returnValue(of(mockProcesses));

    component.ngOnInit();

    expect(component.processes.length).toBe(1);
    expect(component.processes).toEqual(mockProcesses);
  });

  it('should handle error when loading processes fails', () => {
    const consoleSpy = spyOn(console, 'error');
    methodeServiceSpy.getProcesses.and.returnValue(throwError('Error'));

    component.loadProcesses();

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching processes', 'Error');
  });

  it('should open confirmation dialog when deleting process', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openDeleteConfirmationDialog('1');

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should delete process if confirmation dialog returns true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);
    methodeServiceSpy.deleteProcess.and.returnValue(of(null));

    component.openDeleteConfirmationDialog('1');

    expect(methodeServiceSpy.deleteProcess).toHaveBeenCalledWith('1');
  });
});
