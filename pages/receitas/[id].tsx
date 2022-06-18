import {
  useEffect,
  useState,
} from 'react';

import { notification } from 'antd';
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import { calcularValor } from '../../utils/calculo.util';
import { Ingredient } from '../ingredientes/types/ingredient';
import RecipeForm from './components/RecipeForm';
import { Recipe } from './types/recipe';

const RecipePage: NextPage = (props: any) => {
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const { recipe, ingredients } = props
    const val = calcularValor(recipe?.ingredients, ingredients)
    setTotal(val)
  }, [])

  const onFinish = async (values: Recipe) => {
    try {
      await updateDoc(doc(db, 'recipe', props?.recipe?.key), values);
      notification.success({ message: 'Receita atualizada!', });
      router.push('/receitas');
    } catch (e) {
      notification.error({ message: 'Oops! Algo deu errado... Tente novamente.' });
      console.error('ERROR:', JSON.stringify(e))
    }
  };

  return (
    <Wrapper>
      <h1>{String(total)}</h1>

      <RecipeForm
        onFinish={onFinish}
        initialValues={props.recipe}
        ingredients={props.ingredients}
        setTotal={setTotal}
      />
    </Wrapper>
  );
}

RecipePage.getInitialProps = async (props) => {
  const recipeId = String(props.query.id)
  const recipeSnap = await getDoc(doc(db, "recipe", recipeId));
  const recipe: Partial<Recipe> = {}

  if (recipeSnap.exists()) {
    recipe.name = recipeSnap.data().name
    recipe.ingredients = recipeSnap.data().ingredients
    recipe.key = recipeId
  }

  const ingredientSnap = await getDocs(collection(db, "ingredient"));
  const ingredients: Ingredient[] = [];

  ingredientSnap.forEach((snapshot: DocumentData) => {
    ingredients.push({ key: snapshot.id, ...snapshot.data() })
  });

  return { recipe, ingredients }
}

export default RecipePage