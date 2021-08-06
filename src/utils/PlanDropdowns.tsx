//=====Meal Plan
export const DietTypeDrop = [
  { id: 'VEG', name: 'Vegetarian' },
  { id: 'NONVEG', name: 'Non-Vegetarian' },
  { id: 'EGG', name: 'Eggetarian' },
  { id: 'VEGAN', name: 'Vegan' },
];

export const FitnessGoalDrop = [
  { id: 'WEIGHTGAIN', name: 'Weight Gain' },
  { id: 'WEIGHTLOSS', name: 'Weight Loss' },
  { id: 'MAINTAINWEIGHT', name: 'Maintain Weight' },
];
export const FitnessGoalWomenDrop = [
  { id: 'WEIGHTGAIN', name: 'Weight Gain' },
  { id: 'WEIGHTLOSS', name: 'Weight Loss' },
  { id: 'MAINTAINWEIGHT', name: 'Maintain Weight' },
  { id: 'WEIGHTGAINPOSTPARTUM', name: 'Weight Gain (Post-Partum)' },
  { id: 'WEIGHTLOSSPOSTPARTUM', name: 'Weight Loss (Post-Partum)' },
  { id: 'MAINTAINWEIGHTPOSTPARTUM', name: 'Maintain Weight (Post-Partum)' },
];
export const LifeStyleDrop = [
  { id: 'SEDENTARY', name: 'Sedentary' },
  { id: 'LIGHTLYACTIVE', name: 'Lightly Active' },
  { id: 'MODERATEACTIVE', name: 'Moderately Active' },
  { id: 'VERYACTIVE', name: 'Very Active' },
];

//==========Workout Plan===========
export const ExperienceDrop = [
  { id: 'BEGINNER', name: 'Beginner' },
  { id: 'INTERMEDIATE', name: 'Intermediate' },
  { id: 'PROFESSIONAL', name: 'Professional' },
];

export const PreferredDrop = [
  { id: 'STRENGTH', name: 'Strength Training' },
  { id: 'HIIT', name: 'HIIT' },
];

export const InterestsDrop = [
  { id: 'HOME', name: 'Home Workout' },
  { id: 'GYM', name: 'Gym Workout' },
];

//=========Skincare Plan============
export const SkinTypeDrop = [
  { id: 'DRY', name: 'Dry' },
  { id: 'OILY', name: 'Oily' },
  { id: 'COMBINATION', name: 'Combination' },
  { id: 'NORMAL', name: 'Normal' },
];

export const CurrentClimateDrop = [
  { id: 'HOT', name: 'Hot' },
  { id: 'COLD', name: 'Cold' },
  { id: 'HUMID', name: 'Humid' },
  { id: 'DRY', name: 'Dry' },
];

export const SkinIrregularDrop = [
  {
    id: 'ACNE', name: 'Acne', SubDrop: [
      { id: 'PIMPLES', name: 'Pimples' },
      { id: 'BLACKHEADS', name: 'Black Heads' },
      { id: 'WHITEHEADS', name: 'White Heads' },
    ]
  },
  {
    id: 'RASHES', name: 'Rashes', SubDrop: [
      { id: 'SCALY', name: 'Scaly' },
      { id: 'ITCHY', name: 'Itchy' },
      { id: 'BUMPY', name: 'Bumpy' },
      { id: 'BOILS', name: 'Boils' },
      { id: 'BLISTERS', name: 'Blisters' },
    ]
  },
  {
    id: 'DISCOLORATION', name: 'Discoloration', SubDrop: [
      { id: 'BLACKISH', name: 'Blackish' },
      { id: 'WHITISH', name: 'Whitish' },
      { id: 'PINKISH', name: 'Pinkish' },
      { id: 'REDDISH', name: 'Reddish' },
      { id: 'SUNSPOTS', name: 'Sun Spots' },
    ]
  },
];

export const SkinTextureDrop = [
  { id: 'SAGGY', name: 'Saggy', },
  { id: 'FINELINES', name: ' Fine Lines' },
  { id: 'WRINKLES', name: 'Wrinkles' },
  { id: 'NONE', name: 'None' },
];

export const CcpaStatus = [
  { id: '0', name: 'Pending', },
  { id: '1', name: 'Processing' },
  { id: '2', name: 'Closed' },
];

export const NoOption = { id: '', name: '' }

export const getSubSkinIrregular = (SkinIrregularValue: any) => {
  return SkinIrregularDrop?.find(({ id }: any) => id == SkinIrregularValue)?.SubDrop || []
}

const getDropValues = (dropValues: any, value: string) => {
  return dropValues.find(({ id }: any) => id == value)?.name || ''
};

export default getDropValues
