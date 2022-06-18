import { useState } from 'react';

import { notification } from 'antd';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import RecipeForm from './components/RecipeForm';
import {
  Recipe,
  RecipeIngredient,
} from './types/recipe';

const NewRecipe: NextPage = (props: any) => {
  const [total, setTotal] = useState(0)
  const router = useRouter()

  const onFinish = async (values: Recipe) => {
    try {
      await addDoc(collection(db, "recipe"), values);
      notification.success({ message: 'Receita inserida!', });
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
        setTotal={setTotal}
        ingredients={props.ingredients}
      />
    </Wrapper>
  );
}

NewRecipe.getInitialProps = async () => {
  const ingredientSnap = await getDocs(collection(db, "ingredient"));
  const ingredients: RecipeIngredient[] = []

  ingredientSnap.forEach((doc: DocumentData) => {
    ingredients.push({ key: doc.id, ...doc.data() })
  });

  return { ingredients }
}

export default NewRecipe