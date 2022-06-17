import { db } from '../../firebase/clientApp'
import { getDoc, doc, updateDoc } from "firebase/firestore"
import { Button, Form, Input, notification, Select } from 'antd';
import Wrapper from '../../components/Wrapper';
import { useRouter } from 'next/router'
import IngredientForm from './components/IngredientForm';

const RULE = [{ required: true, message: 'Campo obrigatório' }]
const { Option } = Select;
export interface LayoutProps {
  data: {
    id: string
  }
}

const Ingredient = (props: LayoutProps) => {
  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      const docRef = doc(db, 'ingredient', props.data.id)
      await updateDoc(docRef, values);

      notification.success({ message: 'Ingrediente atualizado!', });
      router.push('/ingredientes');
    } catch (e) {
      notification.error({ message: 'Oops! Algo deu errado... Tente novamente.' });
      console.error('ERROR:', JSON.stringify(e))
    }
  };

  const onFinishFailed = (e: unknown) => {
    notification.error({ message: 'Oops!', description: 'Verifique os campos e tente novamente...' });
    console.error('ERROR:', JSON.stringify(e))

  };

  return (
    <Wrapper>
      <IngredientForm onFinish={onFinish} initialValues={props.data} />
    </Wrapper>
  );
}

Ingredient.getInitialProps = async ({ query }) => {
  const ref = doc(db, "ingredient", query.id);
  const snap = await getDoc(ref);
  let data = {}

  if (snap.exists()) {
    data = snap.data()
    data.recipe = query.id
    data.id = snap.id
  }

  return { data }
}

export default Ingredient