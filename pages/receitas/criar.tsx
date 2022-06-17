import { db } from '../../firebase/clientApp'
import { addDoc, collection, getDocs } from "firebase/firestore"
import { notification } from 'antd';
import Wrapper from '../../components/Wrapper';
import { useRouter } from 'next/router'
import RecipeForm from './components/RecipeForm';
import { useState } from 'react';
// import ReceitaForm from './components/ReceitaForm';

const Recipe = (props) => {
  const [total, setTotal] = useState(0)
  const router = useRouter()

  const onFinish = async (values: any) => {
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

Recipe.getInitialProps = async ({ query }) => {
  // const ref = doc(db, "recipe", query.id);
  // const snap = await getDoc(ref);
  // let data = {}

  // if (snap.exists()) {
  //   data = snap.data()
  //   data.id = snap.id
  // }

  const refx = collection(db, "ingredient");
  const querySnapshotx = await getDocs(refx);

  const ingredients = []
  querySnapshotx.forEach((doc) => {
    ingredients.push({ key: doc.id, ...doc.data() })
  });

  return { ingredients }
}

export default Recipe