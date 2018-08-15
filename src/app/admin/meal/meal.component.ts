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

  private i = 0; // for meal id, get this from DB

  constructor(private serverApi: CanteenSeverApiService) { }
  meals;
  async retrieveMeals() {
    try {
      const response = await this.serverApi.GetAllMeals();
      if (response) {
        console.log(response);
        console.log(response['menu-items'][0].description);
        console.log(response['menu-items'][1].price);
      }
    } catch (error) {
      console.log(error);
    }
  }

  retrieveMealsWithPromise() {
    this.serverApi.GetAllMeals().then(data => {
      if (data) {
        console.log(data);
        console.log(data['menu-items'][0].description);
        console.log(data['menu-items'][1].description);
      }
    }).catch(response => {
      console.log(response);
    });
  }

  ngOnInit() {
    this.Meals = [
      new Meal(++this.i, 'Chicken', 20.00),
      new Meal(++this.i, 'Burger', 25.00),
      new Meal(++this.i, 'Potatoes', 15.00),
    ]; // TODO: loadMeals() - load the meals from the DB
    // this.retrieveMeals();
    this.retrieveMealsWithPromise();
  }

  loadMeals() {

  }

  addMeal() {
    this.selectedMeal = new Meal(++this.i, '', 0.00);
    this.Meals.push(this.selectedMeal);
    this.newRecord = true;
  }

  editMeal(meal: Meal) {
    this.selectedMeal = meal;
  }

  deleteMeal(meal: Meal) {
    // TODO: this.serverApi.deleteMeal(meal.id);
    this.loadMeals();
  }

  saveMeal() {
    if (this.newRecord) {
      // TODO: this.serverApi.addMeal(this.selectedMeal);
      this.loadMeals();
      this.newRecord = false;
      this.selectedMeal = null;
    } else {
      // TODO: this.serverApi.updateMeal(this.selectedMeal);
      this.loadMeals();
      this.selectedMeal = null;
    }
  }

  cancel() {
    this.selectedMeal = null;
  }

  loadTemplate(meal: Meal) {
    if (this.selectedMeal && this.selectedMeal.id === meal.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
}
