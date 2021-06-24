import * as Yup from 'yup';

interface IntRecipe {
  id: string
}

interface IntMealTime {
  isEdit: Boolean,
  meal_time: string,
  order: number,
  recipe: IntRecipe[],
}

interface IntMealDays {
  day: number,
  meals: any
}

interface MealPlan {
  diet_type: string,
  calories: string,
  meal_days: IntMealDays[]
}



export const MealTime: IntMealTime = {
  isEdit: true,
  meal_time: '',
  order: 0,
  recipe: []
}

export const initialFormValues: MealPlan = {
  diet_type: '',
  calories: '',
  meal_days: Array(10).fill(null).map((d, i) => ({ day: i + 1, meals: [] }))
};

export const validation = Yup.object().shape({
  diet_type: Yup.string().trim().required('Diet type is required'),
  calories: Yup.number().required('Calories is required'),
  meal_days: Yup.array().of(
    Yup.object().shape({
      day: Yup.number().required('Day is required'),
      meals: Yup.array().of(
        Yup.object().shape({
          recipe: Yup.array().of(
            Yup.object().shape({
              id: Yup.string().trim().required('Recipe is Required'),
            })).min(1, 'Recipe is Required'),
          meal_time: Yup.string().required('Name is required'),
        })
      )
    })).min(10, 'Field is Required')
})
