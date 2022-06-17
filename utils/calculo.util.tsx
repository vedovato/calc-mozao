export const calcularValor = (selectedIngredientsArr, rawIngredientsArr) => {
  if (!selectedIngredientsArr?.length) return 0

  const clean = selectedIngredientsArr.filter(Boolean);
  const cost = clean.reduce((acc: number, ingredient) => {
    const ing = rawIngredientsArr.find(i => i.key == ingredient.id)
    const s1 = Number(ingredient.amount ?? 0) * Number(ing.price)
    const s2 = s1 / Number(ing.total_amount)
    const ingredientValue = Number(s2.toFixed(2))
    return acc + ingredientValue
  }, 0)

  return cost
}