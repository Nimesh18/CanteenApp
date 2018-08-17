import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Meal } from './meal.model';
import { CanteenSeverApiService } from '../../server-api/canteen-sever-api.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  Meals: Array<Meal>;

  selectedMeal: Meal;
  newRecord: boolean;


  disableIDInput = true;

  constructor(private serverApi: CanteenSeverApiService) { }
  // async retrieveMeals() {
  //   try {
  //     const response = await this.serverApi.GetAllMeals();
  //     if (response) {
  //       console.log(response);
  //       console.log(response['menu-items'][0].description);
  //       console.log(response['menu-items'][1].price);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // retrieveMealsWithPromise() {
  //   this.serverApi.GetAllMeals().then(data => {
  //     if (data) {
  //       console.log(data);
  //     }
  //   }).catch(response => {
  //     console.log(response);
  //   });
  // }

  async ngOnInit() {
    await this.loadMeals();
  }

  async loadMeals() {
    try {
      const response = await this.serverApi.GetAllMeals();
      if (response) {
        console.log(response);
        this.Meals = response['menu-items'];
      }
    } catch (error) {
      console.log(error);
    }
    this.disableIDInput = true;
  }

  addMeal() {
    this.selectedMeal = new Meal('', 0.00);
    this.Meals.push(this.selectedMeal);
    this.newRecord = true;
    this.disableIDInput = false;
  }

  editMeal(meal: Meal) {
    this.selectedMeal = meal;
  }

  async deleteMeal(meal: Meal) {
    if (confirm('Are you sure you want to delete this record?')) {
      try {
        // tslint:disable-next-line:max-line-length
        const response = await this.serverApi.DeleteMeal({
           'TableName': 'menu-items',
           'Key': {
             'description': {
               'S': meal.description
              },
            //  'price': {
            //    'S': '$input.path(\'$.price\')'
            //  }
          },
          // 'description': meal.description
        });
        console.log('delete ', response);
      } catch (error) {
        console.log('catch ', error);
      }
      await this.loadMeals();
    }

  }

  async saveMeal() {
    if (this.newRecord) {
      try {
        console.log('selected Meal: ', this.selectedMeal);
        // let meal_obj = {
        //   'description': this.selectedMeal.description,
        //   'price': this.selectedMeal.price
        // };
        const meal_obj = {
          'TableName': 'menu-items',
          'Item': {
            'description': {
              'S': this.selectedMeal.description
            },
            'price': {
              'S': this.selectedMeal.price + ''
            }
          }
        };
        console.log(' emp_obj: ', meal_obj);
        console.log('JSON.stringify ', JSON.stringify(this.selectedMeal));
        const response = await this.serverApi.AddMeal(meal_obj);
        console.log('save Meal ', response);
        this.Meals.pop();
        if (response) {
          console.log('response ', response);
        }
      } catch (error) {
        console.log(error);
      }
      await this.loadMeals();
      this.newRecord = false;
      this.selectedMeal = null;
    } else {
      try {
        console.log('selected Meal: ', this.selectedMeal);
        const meal_obj = {
          'TableName': 'menu-items',
          'Item': {
            'description': {
              'S': this.selectedMeal.description
            },
            'price': {
              'S': this.selectedMeal.price + ''
            }
          }
          // 'description': meal.description
        };
        console.log(' emp_obj: ', meal_obj);
        console.log('JSON.stringify ', JSON.stringify(meal_obj));
        const response = await this.serverApi.AddMeal(meal_obj);
        console.log('update Meal ', response);
        if (response) {
          console.log('response ', response);
        }
      } catch (error) {
        console.log(error);
      }
      await this.loadMeals();
      this.selectedMeal = null;
    }
    this.disableIDInput = true;
  }

  cancel() {
    if (this.selectedMeal.description === '') {
      this.Meals.pop();
    }
    this.selectedMeal = null;
    this.disableIDInput = true;
  }

  loadTemplate(meal: Meal) {
    if (this.selectedMeal && this.selectedMeal.description === meal.description) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
}
