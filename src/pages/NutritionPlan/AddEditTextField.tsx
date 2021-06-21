import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';

const AddEditModelTextFields = (props: any) => {
  const { values, errors, touched, handleBlur, handleChange, formikRef } =
    props;
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const [ingredientList, setIngredientList] = React.useState([]);
  const handleEarlyMorningIngredient = (event: any, newValue: any) => {
    const dummyArrayData = newValue?.map((getId: any) => {
      return {
        id: getId._id,
      };
    });
    formikRef.current.setFieldValue(
      'early_morning.ingredients',
      dummyArrayData
    );
  };

  const handleBreakFastIngredient = (event: any, newValue: any) => {
    const dummyArrayData = newValue?.map((getId: any) => {
      return {
        id: getId._id,
      };
    });
    formikRef.current.setFieldValue('breakfast.ingredients', dummyArrayData);
  };

  const handleLunchIngredient = (event: any, newValue: any) => {
    const dummyArrayData = newValue?.map((getId: any) => {
      return {
        id: getId._id,
      };
    });
    formikRef.current.setFieldValue('lunch.ingredients', dummyArrayData);
  };

  const handleEveningSnacksIngredient = (event: any, newValue: any) => {
    const dummyArrayData = newValue?.map((getId: any) => {
      return {
        id: getId._id,
      };
    });
    formikRef.current.setFieldValue(
      'evening_snack.ingredients',
      dummyArrayData
    );
  };

  const handleDinnerIngredient = (event: any, newValue: any) => {
    const dummyArrayData = newValue?.map((getId: any) => {
      return {
        id: getId._id,
      };
    });
    formikRef.current.setFieldValue('dinner.ingredients', dummyArrayData);
  };

  const handleMidMorningIngredient = (event: any, newValue: any) => {
    const dummyArrayData = newValue?.map((getId: any) => {
      return {
        id: getId._id,
      };
    });
    formikRef.current.setFieldValue(
      'mid_morning_snack.ingredients',
      dummyArrayData
    );
  };

  const listIngredients = async () => {
    Post('app/listAllMealIngredient', {})
      .then((res: any) => {
        if (!res.error) {
          let getequipmentList = res.data.map((data: any) => {
            data.id = data._id;
            return data;
          });
          setIngredientList(getequipmentList);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((err: any) => {
        Snackbar.show(err.message, 'error');
      });
  };

  React.useEffect(() => {
    listIngredients();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label='Goal Plan'
          name='goal_plan'
          variant='outlined'
          error={Boolean(touched.goal_plan && errors.goal_plan)}
          helperText={touched.goal_plan && errors.goal_plan}
          value={values.goal_plan}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label='Activity Factor'
          name='actvity_factor'
          variant='outlined'
          error={Boolean(touched.actvity_factor && errors.actvity_factor)}
          helperText={touched.actvity_factor && errors.actvity_factor}
          value={values.actvity_factor}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label='Deal Type'
          name='diet_type'
          variant='outlined'
          error={Boolean(touched.diet_type && errors.diet_type)}
          helperText={touched.diet_type && errors.diet_type}
          value={values.diet_type}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label='Calories'
          name='calories'
          variant='outlined'
          error={Boolean(touched.calories && errors.calories)}
          helperText={touched.calories && errors.calories}
          value={values.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Protein</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Macros'
          name='protein.macros'
          variant='outlined'
          error={Boolean(touched?.protein?.macros && errors?.protein?.macros)}
          helperText={touched?.protein?.macros && errors?.protein?.macros}
          value={values?.protein?.macros}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Gram'
          name='protein.gram'
          variant='outlined'
          error={Boolean(touched?.protein?.gram && errors?.protein?.gram)}
          helperText={touched?.protein?.gram && errors?.protein?.gram}
          value={values?.protein?.gram}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='protein.calories'
          variant='outlined'
          error={Boolean(
            touched?.protein?.calories && errors?.protein?.calories
          )}
          helperText={touched?.protein?.calories && errors?.protein?.calories}
          value={values?.protein?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Fat</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Macros'
          name='fat.macros'
          variant='outlined'
          error={Boolean(touched?.fat?.macros && errors?.fat?.macros)}
          helperText={touched?.fat?.macros && errors?.fat?.macros}
          value={values?.fat?.macros}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Gram'
          name='fat.gram'
          variant='outlined'
          error={Boolean(touched?.fat?.gram && errors?.fat?.gram)}
          helperText={touched?.fat?.gram && errors?.fat?.gram}
          value={values?.fat?.gram}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='fat.calories'
          variant='outlined'
          error={Boolean(touched?.fat?.calories && errors?.fat?.calories)}
          helperText={touched?.fat?.calories && errors?.fat?.calories}
          value={values?.fat?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      {/* .................................................................................................................................... */}
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Carbs</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Macros'
          name='carbs.macros'
          variant='outlined'
          error={Boolean(touched?.carbs?.macros && errors?.carbs?.macros)}
          helperText={touched?.carbs?.macros && errors?.carbs?.macros}
          value={values?.carbs?.macros}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Gram'
          name='carbs.gram'
          variant='outlined'
          error={Boolean(touched?.carbs?.gram && errors?.carbs?.gram)}
          helperText={touched?.carbs?.gram && errors?.carbs?.gram}
          value={values?.carbs?.gram}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='carbs.calories'
          variant='outlined'
          error={Boolean(touched?.carbs?.calories && errors?.carbs?.calories)}
          helperText={touched?.carbs?.calories && errors?.carbs?.calories}
          value={values?.carbs?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      {/* ................................................................................................................................. */}
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Early Morning</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          id='tags-outlined1'
          options={ingredientList}
          value={ingredientList.filter((data: any) =>
            values?.early_morning?.ingredients
              .map(({ _id }: any) => _id)
              .includes(data._id)
          )}
          getOptionLabel={(option: any) => option.name}
          onChange={handleEarlyMorningIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Select Ingredients'
              name='early_morning.ingredients'
              error={Boolean(
                touched?.early_morning?.ingredients &&
                  touched?.early_morning?.ingredients[0]?.id &&
                  errors?.early_morning?.ingredients &&
                  (errors?.early_morning?.ingredients[0] as any)?.id
              )}
              helperText={
                touched?.early_morning?.ingredients &&
                touched?.early_morning?.ingredients[0]?.id &&
                errors?.early_morning?.ingredients &&
                (errors?.early_morning?.ingredients[0] as any)?.id
              }
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Quantity'
          name='early_morning.quantity'
          variant='outlined'
          error={Boolean(
            touched?.early_morning?.quantity && errors?.early_morning?.quantity
          )}
          helperText={
            touched?.early_morning?.quantity && errors?.early_morning?.quantity
          }
          value={values?.early_morning?.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Protein'
          name='early_morning.protein'
          variant='outlined'
          error={Boolean(
            touched?.early_morning?.protein && errors?.early_morning?.protein
          )}
          helperText={
            touched?.early_morning?.protein && errors?.early_morning?.protein
          }
          value={values?.early_morning?.protein}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Fat'
          name='early_morning.fat'
          variant='outlined'
          error={Boolean(
            touched?.early_morning?.fat && errors?.early_morning?.fat
          )}
          helperText={touched?.early_morning?.fat && errors?.early_morning?.fat}
          value={values?.early_morning?.fat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Carbs'
          name='early_morning.carbs'
          variant='outlined'
          error={Boolean(
            touched?.early_morning?.carbs && errors?.early_morning?.carbs
          )}
          helperText={
            touched?.early_morning?.carbs && errors?.early_morning?.carbs
          }
          value={values?.early_morning?.carbs}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='early_morning.calories'
          variant='outlined'
          error={Boolean(
            touched?.early_morning?.calories && errors?.early_morning?.calories
          )}
          helperText={
            touched?.early_morning?.calories && errors?.early_morning?.calories
          }
          value={values?.early_morning?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      {/* ................................................................................................................................. */}
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Break Fast</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          id='tags-outlined2'
          options={ingredientList}
          value={ingredientList.filter((data: any) =>
            values?.breakfast?.ingredients
              .map(({ _id }: any) => _id)
              .includes(data._id)
          )}
          getOptionLabel={(option: any) => option.name}
          onChange={handleBreakFastIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Select Ingredients'
              name='breakfast.ingredients'
              error={Boolean(
                touched?.breakfast?.ingredients &&
                  touched?.breakfast?.ingredients[0]?.id &&
                  errors?.breakfast?.ingredients &&
                  (errors?.breakfast?.ingredients[0] as any)?.id
              )}
              helperText={
                touched?.breakfast?.ingredients &&
                touched?.breakfast?.ingredients[0]?.id &&
                errors?.breakfast?.ingredients &&
                (errors?.breakfast?.ingredients[0] as any)?.id
              }
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Quantity'
          name='breakfast.quantity'
          variant='outlined'
          error={Boolean(
            touched?.breakfast?.quantity && errors?.breakfast?.quantity
          )}
          helperText={
            touched?.breakfast?.quantity && errors?.breakfast?.quantity
          }
          value={values?.breakfast?.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Protein'
          name='breakfast.protein'
          variant='outlined'
          error={Boolean(
            touched?.breakfast?.protein && errors?.breakfast?.protein
          )}
          helperText={touched?.breakfast?.protein && errors?.breakfast?.protein}
          value={values?.breakfast?.protein}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Fat'
          name='breakfast.fat'
          variant='outlined'
          error={Boolean(touched?.breakfast?.fat && errors?.breakfast?.fat)}
          helperText={touched?.breakfast?.fat && errors?.breakfast?.fat}
          value={values?.breakfast?.fat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Carbs'
          name='breakfast.carbs'
          variant='outlined'
          error={Boolean(touched?.breakfast?.carbs && errors?.breakfast?.carbs)}
          helperText={touched?.breakfast?.carbs && errors?.breakfast?.carbs}
          value={values?.breakfast?.carbs}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='breakfast.calories'
          variant='outlined'
          error={Boolean(
            touched?.breakfast?.calories && errors?.breakfast?.calories
          )}
          helperText={
            touched?.breakfast?.calories && errors?.breakfast?.calories
          }
          value={values?.breakfast?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      {/* ................................................................................................................................. */}
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Mid Morning Snacks</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          id='tags-outlined6'
          options={ingredientList}
          value={ingredientList.filter((data: any) =>
            values?.mid_morning_snack?.ingredients
              .map(({ _id }: any) => _id)
              .includes(data._id)
          )}
          getOptionLabel={(option: any) => option.name}
          onChange={handleMidMorningIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Select Ingredients'
              name='mid_morning_snack.ingredients'
              error={Boolean(
                touched?.mid_morning_snack?.ingredients &&
                  touched?.mid_morning_snack?.ingredients[0]?.id &&
                  errors?.mid_morning_snack?.ingredients &&
                  (errors?.mid_morning_snack?.ingredients[0] as any)?.id
              )}
              helperText={
                touched?.mid_morning_snack?.ingredients &&
                touched?.mid_morning_snack?.ingredients[0]?.id &&
                errors?.mid_morning_snack?.ingredients &&
                (errors?.mid_morning_snack?.ingredients[0] as any)?.id
              }
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Quantity'
          name='mid_morning_snack.quantity'
          variant='outlined'
          error={Boolean(
            touched?.mid_morning_snack?.quantity &&
              errors?.mid_morning_snack?.quantity
          )}
          helperText={
            touched?.mid_morning_snack?.quantity &&
            errors?.mid_morning_snack?.quantity
          }
          value={values?.mid_morning_snack?.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Protein'
          name='mid_morning_snack.protein'
          variant='outlined'
          error={Boolean(
            touched?.mid_morning_snack?.protein &&
              errors?.mid_morning_snack?.protein
          )}
          helperText={
            touched?.mid_morning_snack?.protein &&
            errors?.mid_morning_snack?.protein
          }
          value={values?.mid_morning_snack?.protein}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Fat'
          name='mid_morning_snack.fat'
          variant='outlined'
          error={Boolean(
            touched?.mid_morning_snack?.fat && errors?.mid_morning_snack?.fat
          )}
          helperText={
            touched?.mid_morning_snack?.fat && errors?.mid_morning_snack?.fat
          }
          value={values?.mid_morning_snack?.fat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Carbs'
          name='mid_morning_snack.carbs'
          variant='outlined'
          error={Boolean(
            touched?.mid_morning_snack?.carbs &&
              errors?.mid_morning_snack?.carbs
          )}
          helperText={
            touched?.mid_morning_snack?.carbs &&
            errors?.mid_morning_snack?.carbs
          }
          value={values?.mid_morning_snack?.carbs}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='mid_morning_snack.calories'
          variant='outlined'
          error={Boolean(
            touched?.mid_morning_snack?.calories &&
              errors?.mid_morning_snack?.calories
          )}
          helperText={
            touched?.mid_morning_snack?.calories &&
            errors?.mid_morning_snack?.calories
          }
          value={values?.mid_morning_snack?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      {/* ................................................................................................................................. */}
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Lunch</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          id='tags-outlined3'
          options={ingredientList}
          value={ingredientList.filter((data: any) =>
            values?.lunch?.ingredients
              .map(({ _id }: any) => _id)
              .includes(data._id)
          )}
          getOptionLabel={(option: any) => option.name}
          onChange={handleLunchIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Select Ingredients'
              name='lunch.ingredients'
              error={Boolean(
                touched?.lunch?.ingredients &&
                  touched?.lunch?.ingredients[0]?.id &&
                  errors?.lunch?.ingredients &&
                  (errors?.lunch?.ingredients[0] as any)?.id
              )}
              helperText={
                touched?.lunch?.ingredients &&
                touched?.lunch?.ingredients[0]?.id &&
                errors?.lunch?.ingredients &&
                (errors?.lunch?.ingredients[0] as any)?.id
              }
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Quantity'
          name='lunch.quantity'
          variant='outlined'
          error={Boolean(touched?.lunch?.quantity && errors?.lunch?.quantity)}
          helperText={touched?.lunch?.quantity && errors?.lunch?.quantity}
          value={values?.lunch?.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Protein'
          name='lunch.protein'
          variant='outlined'
          error={Boolean(touched?.lunch?.protein && errors?.lunch?.protein)}
          helperText={touched?.lunch?.protein && errors?.lunch?.protein}
          value={values?.lunch?.protein}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Fat'
          name='lunch.fat'
          variant='outlined'
          error={Boolean(touched?.lunch?.fat && errors?.lunch?.fat)}
          helperText={touched?.lunch?.fat && errors?.lunch?.fat}
          value={values?.lunch?.fat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Carbs'
          name='lunch.carbs'
          variant='outlined'
          error={Boolean(touched?.lunch?.carbs && errors?.lunch?.carbs)}
          helperText={touched?.lunch?.carbs && errors?.lunch?.carbs}
          value={values?.lunch?.carbs}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='lunch.calories'
          variant='outlined'
          error={Boolean(touched?.lunch?.calories && errors?.lunch?.calories)}
          helperText={touched?.lunch?.calories && errors?.lunch?.calories}
          value={values?.lunch?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      {/* ................................................................................................................................. */}
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Evening Snacks</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          id='tags-outlined4'
          options={ingredientList}
          value={ingredientList.filter((data: any) =>
            values?.evening_snack?.ingredients
              .map(({ _id }: any) => _id)
              .includes(data._id)
          )}
          getOptionLabel={(option: any) => option.name}
          onChange={handleEveningSnacksIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Select Ingredients'
              name='evening_snack.ingredients'
              error={Boolean(
                touched?.evening_snack?.ingredients &&
                  touched?.evening_snack?.ingredients[0]?.id &&
                  errors?.evening_snack?.ingredients &&
                  (errors?.evening_snack?.ingredients[0] as any)?.id
              )}
              helperText={
                touched?.evening_snack?.ingredients &&
                touched?.evening_snack?.ingredients[0]?.id &&
                errors?.evening_snack?.ingredients &&
                (errors?.evening_snack?.ingredients[0] as any)?.id
              }
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Quantity'
          name='evening_snack.quantity'
          variant='outlined'
          error={Boolean(
            touched?.evening_snack?.quantity && errors?.evening_snack?.quantity
          )}
          helperText={
            touched?.evening_snack?.quantity && errors?.evening_snack?.quantity
          }
          value={values?.evening_snack?.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Protein'
          name='evening_snack.protein'
          variant='outlined'
          error={Boolean(
            touched?.evening_snack?.protein && errors?.evening_snack?.protein
          )}
          helperText={
            touched?.evening_snack?.protein && errors?.evening_snack?.protein
          }
          value={values?.evening_snack?.protein}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Fat'
          name='evening_snack.fat'
          variant='outlined'
          error={Boolean(
            touched?.evening_snack?.fat && errors?.evening_snack?.fat
          )}
          helperText={touched?.evening_snack?.fat && errors?.evening_snack?.fat}
          value={values?.evening_snack?.fat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Carbs'
          name='evening_snack.carbs'
          variant='outlined'
          error={Boolean(
            touched?.evening_snack?.carbs && errors?.evening_snack?.carbs
          )}
          helperText={
            touched?.evening_snack?.carbs && errors?.evening_snack?.carbs
          }
          value={values?.evening_snack?.carbs}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='evening_snack.calories'
          variant='outlined'
          error={Boolean(
            touched?.evening_snack?.calories && errors?.evening_snack?.calories
          )}
          helperText={
            touched?.evening_snack?.calories && errors?.evening_snack?.calories
          }
          value={values?.evening_snack?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      {/* ................................................................................................................................. */}
      <Grid item xs={12}>
        <Typography variant='h5' align='center'>
          <strong>Dinner</strong>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          id='tags-outlined5'
          options={ingredientList}
          value={ingredientList.filter((data: any) =>
            values?.dinner?.ingredients
              .map(({ _id }: any) => _id)
              .includes(data._id)
          )}
          getOptionLabel={(option: any) => option.name}
          onChange={handleDinnerIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Select Ingredients'
              name='dinner.ingredients'
              error={Boolean(
                touched?.dinner?.ingredients &&
                  touched?.dinner?.ingredients[0]?.id &&
                  errors?.dinner?.ingredients &&
                  (errors?.dinner?.ingredients[0] as any)?.id
              )}
              helperText={
                touched?.dinner?.ingredients &&
                touched?.dinner?.ingredients[0]?.id &&
                errors?.dinner?.ingredients &&
                (errors?.dinner?.ingredients[0] as any)?.id
              }
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Quantity'
          name='dinner.quantity'
          variant='outlined'
          error={Boolean(touched?.dinner?.quantity && errors?.dinner?.quantity)}
          helperText={touched?.dinner?.quantity && errors?.dinner?.quantity}
          value={values?.dinner?.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Protein'
          name='dinner.protein'
          variant='outlined'
          error={Boolean(touched?.dinner?.protein && errors?.dinner?.protein)}
          helperText={touched?.dinner?.protein && errors?.dinner?.protein}
          value={values?.dinner?.protein}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Fat'
          name='dinner.fat'
          variant='outlined'
          error={Boolean(touched?.dinner?.fat && errors?.dinner?.fat)}
          helperText={touched?.dinner?.fat && errors?.dinner?.fat}
          value={values?.dinner?.fat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Carbs'
          name='dinner.carbs'
          variant='outlined'
          error={Boolean(touched?.dinner?.carbs && errors?.dinner?.carbs)}
          helperText={touched?.dinner?.carbs && errors?.dinner?.carbs}
          value={values?.dinner?.carbs}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label='Calories'
          name='dinner.calories'
          variant='outlined'
          error={Boolean(touched?.dinner?.calories && errors?.dinner?.calories)}
          helperText={touched?.dinner?.calories && errors?.dinner?.calories}
          value={values?.dinner?.calories}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
    </Grid>
  );
};

export default AddEditModelTextFields;
