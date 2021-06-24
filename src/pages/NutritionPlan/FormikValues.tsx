import * as Yup from 'yup';

interface NutritionQuantity {
  macros: number,
  gram: number,
  calories: number,
}

interface IntMealTime {
  isEdit: Boolean,
  meal_time: string,
  order: number,
  meals: IntMeal[],
}

interface IntIngredients {
  id: string
}

interface IntMeal {
  ingredients: IntIngredients[],
  quantity: number,
  protein: number,
  fat: number,
  carbs: number,
  calories: number,
}

interface NutritionPlan {
  diet_type: string,
  calories: string,
  protein: NutritionQuantity,
  fat: NutritionQuantity,
  carbs: NutritionQuantity
  nutrition: IntMealTime[]
}

export const NutQuantity: NutritionQuantity = {
  macros: 0,
  gram: 0,
  calories: 0,
}

export const NutMealTime: IntMealTime = {
  isEdit: true,
  meal_time: '',
  order: 0,
  meals: []
}

export const NutMeal: IntMeal = {
  ingredients: [],
  quantity: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
  calories: 0,
}


export const initialFormValues: NutritionPlan = {
  diet_type: '',
  calories: '',
  protein: NutQuantity,
  fat: NutQuantity,
  carbs: NutQuantity,
  nutrition: []
};

const ValNut = Yup.object({
  macros: Yup.string().trim().required('Macros is required'),
  gram: Yup.string().trim().required('Gram is required'),
  calories: Yup.string().trim().required('Calories is required'),
})

export const validation = Yup.object().shape({
  diet_type: Yup.string().trim().required('Diet type is required'),
  calories: Yup.number().required('Calories is required'),
  protein: ValNut,
  fat: ValNut,
  carbs: ValNut,
  nutrition: Yup.array().of(
    Yup.object().shape({
      meal_time: Yup.string().trim().required('Name is required'),
      meals: Yup.array().of(
        Yup.object().shape({
          ingredients: Yup.array().of(
            Yup.object().shape({
              id: Yup.string().trim().required('Before Workout is Required'),
            })).min(1, 'Ingredients is Required'),
          quantity: Yup.number().required('Quantity is required'),
          protein: Yup.number().required('Protein is required'),
          fat: Yup.number().required('Fat is required'),
          carbs: Yup.number().required('Carbs is required'),
          calories: Yup.number().required('Calories is required'),
        })
      ).min(1, 'Meal is Required')
    })).min(1, 'Field is Required')
})
