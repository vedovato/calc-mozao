import {
  Button,
  Space,
  Table,
} from 'antd';
import {
  collection,
  DocumentData,
  getDocs,
} from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

import { PlusCircleOutlined } from '@ant-design/icons';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import { Ingredient } from './types/ingredient';

const COLUMNS = [
  { title: 'Ingrediente', dataIndex: 'name' },
  { title: 'Preço', dataIndex: 'price' },
  {
    title: 'Quantidade', render: (_: unknown, record: Ingredient) => {
      return `${record.total_amount}${record.unity}`
    }
  },
  {
    title: 'Ações',
    render: (_: unknown, record: Ingredient) => (
      <Space size="middle">
        <Link href={`/ingredientes/${record.key}`}>
          <a>Visualizar</a>
        </Link>
      </Space>
    ),
  },
]

const Ingredients: NextPage = (props: any) => {
  const router = useRouter()

  return (
    <Wrapper>
      <Button
        type="primary"
        shape="round"
        icon={<PlusCircleOutlined />}
        onClick={() => router.push('/ingredientes/criar')}
      >
        Adicionar
      </Button>

      <Table dataSource={props.ingredients} columns={COLUMNS} />
    </Wrapper>
  );
}

export async function getStaticProps() {
  const ingredientSnap = await getDocs(collection(db, "ingredient"));
  const ingredients: Ingredient[] = []

  ingredientSnap.forEach((doc: DocumentData) => {
    ingredients.push({ key: doc.id, ...doc.data() })
  });

  return {
    props: { ingredients }
  }
}

export default Ingredients