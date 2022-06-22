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
import {
  NextPage,
  NextPageContext,
} from 'next/types';

import {
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import { Ingredient } from '../../types/ingredient.type';
import { toReal } from '../../utils/calculo.util';

const COLUMNS = [
  { title: 'Ingrediente', dataIndex: 'name' },
  { title: 'Preço', key: 'price', render: (item: Ingredient) => toReal(item.price) },
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
          <Button type="primary" shape="circle" icon={<EyeOutlined />} />
        </Link>
      </Space>
    ),
  },
]

const Ingredients: NextPage = (props: any) => {
  const router = useRouter()

  const DATASOURCE: Ingredient[] = props.ingredients.sort(
    (a: Ingredient, b: Ingredient) => a.name.localeCompare(b.name)
  )

  const BUTTONS = [
    {
      type: 'primary',
      icon: <PlusCircleOutlined />,
      onClick: () => router.push('/ingredientes/criar'),
      label: 'Novo Ingrediente'
    }
  ]
  return (
    <Wrapper title='Ingredientes' renderButton={BUTTONS}>
      <Table dataSource={DATASOURCE} columns={COLUMNS} />
    </Wrapper>
  );
}

Ingredients.getInitialProps = async (props: NextPageContext) => {
  const ref = collection(db, "ingredient")
  const ingredientSnap = await getDocs(ref);
  const ingredients: Ingredient[] = []

  ingredientSnap.forEach((doc: DocumentData) => {
    ingredients.push({ key: doc.id, ...doc.data() })
  });

  return { ingredients }
}

export default Ingredients