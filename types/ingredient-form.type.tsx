import { Ingredient } from './ingredient.type';

export type IngredientFormProps = {
  onFinish: (result: Ingredient) => void,
  initialValues?: Object
}

