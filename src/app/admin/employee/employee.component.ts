import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Employee } from './employee.model';
import { CanteenSeverApiService } from '../../server-api/canteen-sever-api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  Employees: Array<Employee>;

  selectedEmployee: Employee;
  newRecord: boolean;

  credits: number;
  private i = 0; // for employee id, get this from DB

  constructor(private serverApi: CanteenSeverApiService) { }

  ngOnInit() {
    this.Employees = [
      new Employee(++this.i, 'John', 0),
      new Employee(++this.i, 'Stacy', 0),
      new Employee(++this.i, 'Alex', 0),
      new Employee(++this.i, 'Julie', 0)
    ]; // TODO: load the employees from the DB
  }

  loadEmployees() {

  }
  addEmployee() {
    this.selectedEmployee = new Employee(++this.i, '', 0);
    this.Employees.push(this.selectedEmployee);
    this.newRecord = true;
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  saveEmployee() {
    if (this.newRecord) {
      // TODO: this.serverApi.addEmployee(this.selectedEmployee);
      this.loadEmployees();
      this.newRecord = false;
      this.selectedEmployee = null;
    } else {
      // TODO: this.serverApi.updateEmployee(this.selectedEmployee);
      this.loadEmployees();
      this.selectedEmployee = null;
    }
  }

  deleteEmployee(employee: Employee) {
    // TODO: this.serverApi.deleteEmployee(employee.id);
    this.loadEmployees();
  }

  cancel() {
    this.selectedEmployee = null;
  }

  loadTemplate(employee: Employee) {
    if (this.selectedEmployee && this.selectedEmployee.id === employee.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  canLoadCredits() {
    return this.credits > 0;
  }

  loadCreditsForEveryone() {
    this.Employees.forEach(emp => emp.updateBalance(this.credits));
    this.credits = null;
  }
}
