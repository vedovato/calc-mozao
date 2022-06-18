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
import { calcularValor } from '../../utils/calculo.util';

const Receitas: NextPage = (props: any) => {
  const data: Recipe[] = props?.recipes
  const router = useRouter()

  const columns = [
    { title: 'Receita', dataIndex: 'name', key: 'name' },
    { title: 'Ingredientes', dataIndex: 'ingredients', key: 'ingredients', render: (item: Array<DocumentData>) => item.length },
    { title: 'Custo', key: 'price', render: (item: Recipe) => calcularValor(item.ingredients, props.ingredients) },
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
    <Wrapper>
      <Button
        type="primary"
        shape="round"
        icon={<PlusCircleOutlined />}
        onClick={() => router.push('/receitas/criar')}
        style={{ marginBottom: 30 }}
      >
        Adicionar
      </Button>

      <Table dataSource={data} columns={columns} />
    </Wrapper>
  );
}

export async function getStaticProps() {
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

  return {
    props: { recipes, ingredients }
  }
}

export default Receitas