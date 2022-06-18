import { Ingredient } from '../../ingredientes/types/ingredient';
import { Recipe } from './recipe';

export type RecipeFormProps = {
  onFinish: (result: Recipe) => void
  initialValues: Object,
  ingredients: Array<Ingredient>,
  setTotal: Function
}