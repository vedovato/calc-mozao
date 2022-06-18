import { notification } from 'antd';
import {
  addDoc,
  collection,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import IngredientForm from './components/IngredientForm';
import { Ingredient } from './types/ingredient';

const CreateIngredient: NextPage = () => {
  const router = useRouter()

  const onFinish = async (values: Ingredient) => {
    try {
      await addDoc(collection(db, "ingredient"), values);
      notification.success({ message: 'Ingrediente inserido!', });
      router.push('/ingredientes');
    } catch (e) {
      notification.error({ message: 'Oops! Algo deu errado... Tente novamente.' });
      console.error('ERROR:', JSON.stringify(e))
    }
  };

  return (
    <Wrapper>
      <IngredientForm onFinish={onFinish} />
    </Wrapper>
  );
}

export default CreateIngredient