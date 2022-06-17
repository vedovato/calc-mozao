import { db } from '../../firebase/clientApp'
import { addDoc, collection } from "firebase/firestore"
import { notification } from 'antd';
import Wrapper from '../../components/Wrapper';
import { useRouter } from 'next/router'
import IngredientForm from './components/IngredientForm';

const Ingredient = (props) => {
  const router = useRouter()

  const onFinish = async (values: any) => {
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

export default Ingredient