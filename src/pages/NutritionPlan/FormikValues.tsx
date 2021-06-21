import * as Yup from 'yup';

interface Ingredients {
  id: string;
}

interface FoodItems {
  macros: string;
  gram: string;
  calories: string;
}

interface FoodTiming {
  ingredients: Ingredients[];
  quantity: string;
  protein: string;
  fat: string;
  carbs: string;
  calories: string;
}

interface NutritionPlan {
  goal_plan: string;
  actvity_factor: string;
  diet_type: string;
  calories: string;
  protein: FoodItems;
  fat: FoodItems;
  carbs: FoodItems;
  early_morning: FoodTiming;
  breakfast: FoodTiming;
  mid_morning_snack: FoodTiming;
  lunch: FoodTiming;
  evening_snack: FoodTiming;
  dinner: FoodTiming;
}

export const initialValues: NutritionPlan = {
  goal_plan: '',
  actvity_factor: '',
  diet_type: '',
  calories: '',
  protein: {
    macros: '',
    gram: '',
    calories: '',
  },
  fat: {
    macros: '',
    gram: '',
    calories: '',
  },
  carbs: {
    macros: '',
    gram: '',
    calories: '',
  },
  early_morning: {
    ingredients: [{ id: '' }],
    quantity: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
  },
  breakfast: {
    ingredients: [{ id: '' }],
    quantity: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
  },
  mid_morning_snack: {
    ingredients: [{ id: '' }],
    quantity: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
  },
  lunch: {
    ingredients: [{ id: '' }],
    quantity: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
  },
  evening_snack: {
    ingredients: [{ id: '' }],
    quantity: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
  },
  dinner: {
    ingredients: [{ id: '' }],
    quantity: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: '',
  },
};

export const validation = {
  validationSchema: Yup.object().shape({
    goal_plan: Yup.string().trim().required('Goal plan is required'),
    actvity_factor: Yup.string().trim().required('Activiy factor is required'),
    diet_type: Yup.string().trim().required('Diet type is required'),
    calories: Yup.string().trim().required('Calories is required'),
    protein: Yup.object({
      macros: Yup.string().trim().required('Macros is required'),
      gram: Yup.string().trim().required('Gram is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    fat: Yup.object({
      macros: Yup.string().trim().required('Macros is required'),
      gram: Yup.string().trim().required('Gram is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    carbs: Yup.object({
      macros: Yup.string().trim().required('Macros is required'),
      gram: Yup.string().trim().required('Gram is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    early_morning: Yup.object({
      ingredients: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().required('Ingredients is Required'),
        })
      ),
      quantity: Yup.string().trim().required('Quality is required'),
      protein: Yup.string().trim().required('Protein is required'),
      fat: Yup.string().trim().required('Fat is required'),
      carbs: Yup.string().trim().required('Carbs is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    breakfast: Yup.object({
      ingredients: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().required('Ingredients is Required'),
        })
      ),
      quantity: Yup.string().trim().required('Quality is required'),
      protein: Yup.string().trim().required('Protein is required'),
      fat: Yup.string().trim().required('Fat is required'),
      carbs: Yup.string().trim().required('Carbs is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    mid_morning_snack: Yup.object({
      ingredients: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().required('Ingredients is Required'),
        })
      ),
      quantity: Yup.string().trim().required('Quality is required'),
      protein: Yup.string().trim().required('Protein is required'),
      fat: Yup.string().trim().required('Fat is required'),
      carbs: Yup.string().trim().required('Carbs is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    lunch: Yup.object({
      ingredients: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().required('Ingredients is Required'),
        })
      ),
      quantity: Yup.string().trim().required('Quality is required'),
      protein: Yup.string().trim().required('Protein is required'),
      fat: Yup.string().trim().required('Fat is required'),
      carbs: Yup.string().trim().required('Carbs is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    evening_snack: Yup.object({
      ingredients: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().required('Ingredients is Required'),
        })
      ),
      quantity: Yup.string().trim().required('Quality is required'),
      protein: Yup.string().trim().required('Protein is required'),
      fat: Yup.string().trim().required('Fat is required'),
      carbs: Yup.string().trim().required('Carbs is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
    dinner: Yup.object({
      ingredients: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().required('Ingredients is Required'),
        })
      ),
      quantity: Yup.string().trim().required('Quality is required'),
      protein: Yup.string().trim().required('Protein is required'),
      fat: Yup.string().trim().required('Fat is required'),
      carbs: Yup.string().trim().required('Carbs is required'),
      calories: Yup.string().trim().required('Calories is required'),
    }),
  }),
};
