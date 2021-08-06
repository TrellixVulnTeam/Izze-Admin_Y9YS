import * as Yup from 'yup';

interface NutritionQuantity {
  macros: string,
  gram: string,
  calories: string,
}

interface IntMealTime {
  isEdit: Boolean,
  meal_time: string,
  order: number,
  meals: IntMeal[][],
}

interface IntMeal {
  id: string,
  quantity: string,
  quantity_unit: string,
  protein: string,
  fat: string,
  carbs: string,
  calories: string,
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
  macros: '',
  gram: '',
  calories: '',
}

export const NutMealTime: IntMealTime = {
  isEdit: true,
  meal_time: '',
  order: 0,
  meals: []
}

export const NutMeal: IntMeal = {
  id: '',
  quantity: '',
  quantity_unit: '',
  protein: '',
  fat: '',
  carbs: '',
  calories: '',
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
  macros: Yup.number().typeError('Macros must be in number').required('Macros is required'),
  gram: Yup.number().typeError('Gram must be in number').required('Gram is required'),
  calories: Yup.number().typeError('Calories must be in number').required('Calories is required'),
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
        Yup.array().of(
          Yup.object().shape({
            id: Yup.string().trim().required('Ingredients is Required'),
            quantity: Yup.mixed().required('Quality is required').when('quantity_unit', {
              is: 'None',
              then: Yup.string(),
              otherwise: Yup.number().typeError('Quantity must be in number')
            }),
            quantity_unit: Yup.string().trim().required('Quantity unit is required'),
            protein: Yup.number().typeError('Protein must be in number').required('Protein is required'),
            fat: Yup.number().typeError('Fat must be in number').required('Fat is required'),
            carbs: Yup.number().typeError('Carbs must be in number').required('Carbs is required'),
            calories: Yup.number().typeError('Calories must be in number').required('Calories is required'),
          })
        )
      ).min(1, 'Meal is Required')
    })).min(1, 'Field is Required')
})
