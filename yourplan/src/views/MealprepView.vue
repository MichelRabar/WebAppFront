<template>
    <div class="meal-prep">
      <h2 class="meal-prep-title">Meal Prep</h2>
      <div v-for="(meal, index) in meals" :key="index">
        <h3>{{ meal.name }}</h3>
        <ul>
          <li v-for="(item, i) in meal.items" :key="i">{{ item }}</li>
        </ul>
        <div class="btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary active">
            <input type="checkbox" checked autocomplete="off" @click="addMealItem(meal.name)">
            Dodaj
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        meals: [
          { name: 'Doručak', items: [] },
          { name: 'Ručak', items: [] },
          { name: 'Večera', items: [] }
        ]
      };
    },
    methods: {
      addMealItem(mealName) {
        const newItem = prompt(`Dodaj novi obrok za ${mealName}:`);
        if (newItem) {
          // Ovdje možete dodati logiku za dodavanje obroka u MongoDB
          this.meals.find(meal => meal.name === mealName).items.push(newItem);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .meal-prep {
    text-align: center;
  }
  
  .meal-prep-title {
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
  }
  
  .btn-secondary {
    font-size: 16px;
    padding: 8px 16px;
  }
  
  .btn-secondary input[type="checkbox"] {
    display: none;
  }
  
  .btn-secondary input[type="checkbox"]:checked + label {
    background-color: #6c757d;
  }
  </style>
  