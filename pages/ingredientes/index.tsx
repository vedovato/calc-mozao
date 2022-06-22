import { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
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
  SearchOutlined,
} from '@ant-design/icons';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import { Ingredient } from '../../types/ingredient.type';
import { toReal } from '../../utils/calculo.util';
import FormItemInput from 'antd/lib/form/FormItemInput';

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

  const sortedIngredients: Ingredient[] = props.ingredients.sort((a: Ingredient, b: Ingredient) => a.name.localeCompare(b.name))
  const [DATASOURCE, setDataSource] = useState(sortedIngredients)

  const onValuesChange = (props: any) => {
    if (!props.term) return setDataSource(sortedIngredients)
    setDataSource(sortedIngredients.filter(item => {
      const lower = item.name.toLowerCase()
      return lower.includes(props.term.toLowerCase())
    }))
  }

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
      <Form onValuesChange={onValuesChange} autoComplete="on" style={{ width: '40%' }}>
        <Form.Item name="term" >
          <Input
            prefix={<SearchOutlined />}
            placeholder='Tá procurando algo Mozão?'
            allowClear size='large'
            style={{ borderRadius: 20 }}
          />
        </Form.Item>
      </Form>

      <Table dataSource={DATASOURCE} columns={COLUMNS} />
    </Wrapper >
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