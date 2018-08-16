import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Employee } from './employee.model';
import { CanteenSeverApiService } from '../../server-api/canteen-sever-api.service';

declare var $: any;

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

  disableIDInput = true;

  modalHeader = 'Delete confirmation';
  modalText = 'Are yiou sure you want to delete this record?';

  constructor(private serverApi: CanteenSeverApiService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  async loadEmployees() {
    try {
      const response = await this.serverApi.GetEmployees();
      if (response) {
        this.Employees = response['staff'];
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    this.disableIDInput = true;
  }
  addEmployee() {
    this.selectedEmployee = new Employee('', '', 0, '');
    this.Employees.push(this.selectedEmployee);
    this.newRecord = true;
    this.disableIDInput = false;
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  async saveEmployee() {
    if (this.newRecord) {
      try {
        console.log('selected Employee: ', this.selectedEmployee);
        const emp_obj = {
          'staff_id': this.selectedEmployee.staff_id,
          'name': this.selectedEmployee.name,
          'account_balance': this.selectedEmployee.account_balance + '',
          'tag_number': this.selectedEmployee.tag_number
        };
        console.log(' emp_obj: ', emp_obj);
        const response = await this.serverApi.AddEmployee(this.selectedEmployee);
        console.log('save Employee ', response);
        const lastEmployee = this.Employees.pop();
        if (response['result']) {
          lastEmployee.staff_id = response['result'].staff_id;
        }
      } catch (error) {
        console.log(error);
      }
      this.loadEmployees();
      this.newRecord = false;
      this.selectedEmployee = null;
    } else {
      try {
        console.log('selected Employee: ', this.selectedEmployee);
        const emp_obj = {
          'staff_id': this.selectedEmployee.staff_id,
          'name': this.selectedEmployee.name,
          'account_balance': this.selectedEmployee.account_balance + '',
          'tag_number': this.selectedEmployee.tag_number
        };
        console.log(' emp_obj: ', emp_obj);
        const response = await this.serverApi.UpdateEmployee(emp_obj);
        console.log('update Employee ', response);
      } catch (error) {
        console.log(error);
      }
      this.loadEmployees();
      this.selectedEmployee = null;
    }
    this.disableIDInput = true;
  }

  async deleteEmployee(employee: Employee) {
    // await this.show();
    if (confirm('Are you sure you want to delete this record?')) {
      try {
        const response = this.serverApi.DeleteMeal({ 'staff_id': employee.staff_id });
        console.log('delete ', response);
      } catch (error) {
        console.log('catch ', error);
      }
      console.log('employee deleted');
      this.loadEmployees();
    }
  }

  cancel() {
    if (this.selectedEmployee.staff_id === '') {
      this.Employees.pop();
    }
    this.selectedEmployee = null;
    this.disableIDInput = true;
  }

  loadTemplate(employee: Employee) {
    if (this.selectedEmployee && this.selectedEmployee.staff_id === employee.staff_id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  canLoadCredits() {
    return this.credits > 0;
  }

  async loadCreditsForAll() {
    if (confirm('Are you sure you want to load credits for all employees?')) {
      this.Employees.forEach(emp => {
        const employee = new Employee(emp.staff_id, emp.name, emp.account_balance, emp.tag_number);
        employee.updateBalance(this.credits);
        emp.account_balance = employee.account_balance;

        this.serverApi.LoadCredit({ 'staff_id': emp.staff_id, 'account_balance': emp.account_balance + '' }).then(response => {
          if (response) {
            console.log('Load Credits success', response);
          }
        }).catch(response => {
          console.log('catch ', response);
        });
      });
    }
    this.credits = null;
  }

  async show() {
    $('#myModal').modal('show');
  }

  async hide() {
    $('#myModal').modal('hide');
  }
}
