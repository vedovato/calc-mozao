import { Ingredient } from '../types/ingredient.type';
import { RecipeIngredient } from '../types/recipe.type';

export const toReal = (value: number) => {
  const opts = { style: 'currency', currency: 'BRL' }
  return value.toLocaleString('pt-br', opts);
}

export const calcularCusto = (selectedIngredientsArr: RecipeIngredient[], rawIngredientsArr: Ingredient[]): number => {
  if (!selectedIngredientsArr?.length || !rawIngredientsArr?.length) return 0
  const clean = selectedIngredientsArr.filter(Boolean);

  return clean.reduce((acc: number, ingredient) => {
    const ing: Ingredient | any = rawIngredientsArr.find(i => i.key == ingredient.id)
    const s1 = Number(ingredient.amount ?? 0) * Number(ing.price)
    const s2 = s1 / Number(ing.total_amount)

    const ingredientValue = Number(s2.toFixed(2))
    return acc + ingredientValue
  }, 0)
}