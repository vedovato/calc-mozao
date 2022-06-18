import { Ingredient } from './ingredient';

export type IngredientFormProps = {
  onFinish: (result: Ingredient) => void,
  initialValues: Object
}

