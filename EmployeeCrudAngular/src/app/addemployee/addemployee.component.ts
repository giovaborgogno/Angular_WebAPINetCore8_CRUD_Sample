import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', '');
  submitBtnText: string = "Create";
  imgLoadingDisplay: string = 'none';

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const employeeId = params['id'];
      if (employeeId)
        this.editEmployee(employeeId);
    });
  }

  addEmployee(employee: Employee) {
    const validationError = this.validateEmployee(employee);
    if (validationError) {
      this.toastr.error(validationError);
      return;
    }

    if (employee.id == 0) {
      employee.createdDate = new Date().toISOString();
      this.employeeService.createEmployee(employee).subscribe(result => this.router.navigate(['/']));
    }
    else {
      employee.createdDate = new Date().toISOString();
      this.employeeService.updateEmployee(employee).subscribe(result => this.router.navigate(['/']));
    }
    this.submitBtnText = "";
    this.imgLoadingDisplay = 'inline';
  }

  editEmployee(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(res => {
      this.newEmployee.id = res.id;
      this.newEmployee.name = res.name
      this.submitBtnText = "Edit";
    });
  }

  private validateEmployee(employee: Employee): string | null {
    // Validación 1: El nombre no puede estar vacío o ser solo espacios
    if (!employee.name.trim()) {
      return 'El nombre no puede estar vacío o compuesto solo de espacios.';
    }

    // Validación 2: El nombre debe tener al menos dos caracteres
    if (employee.name.length < 2) {
      return 'El nombre debe tener al menos dos caracteres.';
    }

    // Validación 3: El nombre no puede contener números
    if (/\d/.test(employee.name)) {
      return 'El nombre no puede contener números.';
    }

    // Validación 4: Cada parte del nombre debe contener al menos un carácter
    const nameParts = employee.name.split(' ');
    if (nameParts.some(part => part.length < 2)) {
      return 'Cada parte del nombre debe contener al menos dos caracteres.';
    }

    // Validación 5: El nombre no puede ser trivial
    const trivialNames = ['Empleado', 'N/A', 'Nombre'];
    if (trivialNames.includes(employee.name.trim())) {
      return 'El nombre no puede ser un nombre trivial.';
    }

    return null; // Todas las validaciones pasaron
  }

}
