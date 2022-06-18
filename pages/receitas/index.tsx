import type { NextPage } from 'next'
import { db } from '../../firebase/clientApp'
import { collection, DocumentData, getDocs } from "firebase/firestore"
import { Button, Space, Table } from 'antd';
import Wrapper from '../../components/Wrapper';
import Link from 'next/link';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Recipe } from './types/recipe';

const Receitas: NextPage = (props: any) => {
  const data: Recipe[] = props?.data
  const router = useRouter()

  const columns = [
    { title: 'Receita', dataIndex: 'name', key: 'name' },
    { title: 'Ingredientes', dataIndex: 'ingredients', key: 'ingredients', render: (item: Array<DocumentData>) => item.length },
    {
      title: 'Ações',
      key: 'action',
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Link href={`/receitas/${record.key}`}>
            <a>Visualizar</a>
          </Link>
          <a>Editar</a>
        </Space>
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

  const data: Recipe[] = []
  querySnapshot.forEach((doc: DocumentData) => {
    data.push({ key: doc.id, ...doc.data() })
  });

  return {
    props: { data }
  }
}

export default Receitas