import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddemployeeComponent } from './addemployee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // para simular observables
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

describe('AddemployeeComponent', () => {
  let component: AddemployeeComponent;
  let fixture: ComponentFixture<AddemployeeComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [AddemployeeComponent, HttpClientTestingModule],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute, // Simula ActivatedRoute
          useValue: {
            params: of({ id: 1 }) // simula el parámetro id en la URL
          }
        },
        { provide: ToastrService, useValue: toastrSpy },
      ]
    });

    fixture = TestBed.createComponent(AddemployeeComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if name is less than 2 characters', () => {
    component.newEmployee.name = 'A'; // nombre con menos de 2 caracteres
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith(
      'El nombre debe tener al menos dos caracteres.'
    );
  });

  it('should display error if name contains numbers', () => {
    component.newEmployee.name = 'John1 Doe';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith(
      'El nombre no puede contener números.'
    );
  });

  it('should display error if any part of name is less than 2 characters', () => {
    component.newEmployee.name = 'A B'; // nombre con partes de menos de 2 caracteres
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Cada parte del nombre debe contener al menos dos caracteres.'
    );
  });

  it('should display error if name is empty', () => {
    component.newEmployee.name = '';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith(
      'El nombre no puede estar vacío o compuesto solo de espacios.'
    );
  });

  it('should display error if name is just spaces', () => {
    component.newEmployee.name = '    ';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith(
      'El nombre no puede estar vacío o compuesto solo de espacios.'
    );
  });

  it('should display error if name is trivial', () => {
    component.newEmployee.name = 'Empleado'; // nombre trivial
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith(
      'El nombre no puede ser un nombre trivial.'
    );
  });

  it('should not display errors for valid name', () => {
    component.newEmployee.name = 'John Doe';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).not.toHaveBeenCalled();
  });
});