import { useState, useEffect } from 'react';
import { Button, Form, Input, notification, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getDoc, doc, updateDoc, collection, getDocs } from "firebase/firestore"
import { useRouter } from 'next/router'
import { db } from '../../firebase/clientApp'
import Wrapper from '../../components/Wrapper';
import { calcularValor } from '../../utils/calculo.util';
import RecipeForm from './components/RecipeForm';

const RULE = [{ required: true, message: 'Campo obrigatório' }]
const { Option } = Select;

const Recipe = (props) => {
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const val = calcularValor(props.data.ingredients, props.ingredients)
    setTotal(val)
  }, [])

  const onFinish = async (values: any) => {
    try {
      const docRef = doc(db, 'recipe', props.data.id)
      await updateDoc(docRef, values);

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
        initialValues={props.data}
        ingredients={props.ingredients}
        setTotal={setTotal}
      />
    </Wrapper>
  );
}

Recipe.getInitialProps = async ({ query }) => {
  const ref = doc(db, "recipe", query.id);
  const snap = await getDoc(ref);
  let data = {}

  if (snap.exists()) {
    data = snap.data()
    data.id = snap.id
  }

  const refx = collection(db, "ingredient");
  const querySnapshotx = await getDocs(refx);

  const ingredients = []
  querySnapshotx.forEach((doc) => {
    ingredients.push({ key: doc.id, ...doc.data() })
  });

  return { data, ingredients }
}

export default Recipe