import {
  Button,
  Form,
  Input,
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
  SearchOutlined,
} from '@ant-design/icons';

import Wrapper from '../../components/Wrapper';
import { db } from '../../firebase/clientApp';
import { Ingredient } from '../../types/ingredient.type';
import { Recipe } from '../../types/recipe.type';
import {
  calcularCusto,
  toReal,
} from '../../utils/calculo.util';
import { useState } from 'react';

const Receitas: NextPage = (props: any) => {
  const router = useRouter()

  const sortedRecipes: Recipe[] = props?.recipes.sort((a: Recipe, b: Recipe) => a.name.localeCompare(b.name))
  const [DATASOURCE, setDataSource] = useState(sortedRecipes)

  const onValuesChange = (props: any) => {
    if (!props.term) return setDataSource(sortedRecipes)
    setDataSource(sortedRecipes.filter(item => {
      const lower = item.name.toLowerCase()
      return lower.includes(props.term.toLowerCase())
    }))
  }

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
      title: 'Custo + iFood', key: 'priceIfood', render: (item: Recipe) => {
        const cost = calcularCusto(item.ingredients, props.ingredients)
        const comission = (cost * 27) / 100
        return toReal(cost + comission)
      }
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