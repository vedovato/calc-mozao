import { notification } from 'antd';
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import {
  NextPage,
  NextPageContext,
} from 'next/types';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import { Ingredient } from '../../types/ingredient.type';
import IngredientForm from './components/IngredientForm';

const EditIngredient: NextPage = (props: any) => {
  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      const docRef = doc(db, 'ingredient', props.ingredientId)
      await updateDoc(docRef, values);

      notification.success({ message: 'Ingrediente atualizado!', });
      router.push('/ingredientes');
    } catch (e) {
      notification.error({ message: 'Oops! Algo deu errado... Tente novamente.' });
      console.error('ERROR:', JSON.stringify(e))
    }
  };

  return (
    <Wrapper>
      <IngredientForm
        onFinish={onFinish}
        initialValues={props.ingredients}
      />
    </Wrapper>
  );
}

EditIngredient.getInitialProps = async (props: NextPageContext) => {
  const ingredientId = String(props.query.id)
  const snap = await getDoc(doc(db, "ingredient", ingredientId));

  let ingredients: Partial<Ingredient> = {}
  if (snap.exists()) ingredients = snap.data()

  return { ingredientId, ingredients }
}

export default EditIngredient