import { Ingredient } from '../types/ingredient.type';
import { RecipeIngredient } from '../types/recipe.type';

export const calcularValor = (selectedIngredientsArr: RecipeIngredient[], rawIngredientsArr: Ingredient[]) => {
  if (!selectedIngredientsArr?.length || !rawIngredientsArr?.length) return 0

  const clean = selectedIngredientsArr.filter(Boolean);
  const value = clean.reduce((acc: number, ingredient) => {
    const ing: Ingredient | any = rawIngredientsArr.find(i => i.key == ingredient.id)
    const s1 = Number(ingredient.amount ?? 0) * Number(ing.price)
    const s2 = s1 / Number(ing.total_amount)
    const ingredientValue = Number(s2.toFixed(2))
    return acc + ingredientValue
  }, 0)

  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}