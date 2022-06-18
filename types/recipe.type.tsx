export type RecipeIngredient = {
  id: string;
  amount: number;
  unity: string;
}

export type Recipe = {
  key: string;
  name: string;
  ingredients: RecipeIngredient[];
}
