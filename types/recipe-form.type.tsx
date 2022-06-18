import { Ingredient } from './ingredient.type';
import { Recipe } from './recipe.type';

export type RecipeFormProps = {
  onFinish: (result: Recipe) => void
  initialValues?: Object,
  ingredients: Array<Ingredient>,
  setTotal: Function
}