import {
  Button,
  Table,
} from 'antd';
import {
  collection,
  DocumentData,
  getDocs,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import { Ingredient } from '../../types/ingredient.type';
import { Recipe } from '../../types/recipe.type';
import {
  calcularCusto,
  toReal,
} from '../../utils/calculo.util';

const Receitas: NextPage = (props: any) => {
  const data: Recipe[] = props?.recipes
  const router = useRouter()

  const BUTTONS = [
    {
      type: 'primary',
      icon: <PlusCircleOutlined />,
      onClick: () => router.push('/receitas/criar'),
      label: 'Nova Receita do Mozão'
    }
  ]

  const COLUMNS = [
    { title: 'Receita', dataIndex: 'name', key: 'name' },
    { title: 'Ingredientes', dataIndex: 'ingredients', key: 'ingredients', render: (item: Array<DocumentData>) => item.length },
    {
      title: 'Custo', key: 'price', render: (item: Recipe) =>
        toReal(calcularCusto(item.ingredients, props.ingredients))
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: unknown, record: Recipe) => (
        <Link href={`/receitas/${record.key}`}>
          <Button type="primary" shape="circle" icon={<EyeOutlined />} />
        </Link>
      ),
    },
  ]

  return (
    <Wrapper title='Receitas' renderButton={BUTTONS}>
      <Table dataSource={data} columns={COLUMNS} />
    </Wrapper>
  );
}

Receitas.getInitialProps = async () => {
  const ref = collection(db, "recipe");
  const querySnapshot = await getDocs(ref);

  const recipes: Recipe[] = []
  querySnapshot.forEach((doc: DocumentData) => {
    recipes.push({ key: doc.id, ...doc.data() })
  });

  const ingredientSnap = await getDocs(collection(db, "ingredient"));
  const ingredients: Ingredient[] = [];

  ingredientSnap.forEach((snapshot: DocumentData) => {
    ingredients.push({ key: snapshot.id, ...snapshot.data() })
  });

  return { recipes, ingredients }
}

export default Receitas