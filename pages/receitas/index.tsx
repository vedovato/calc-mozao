import { signInWithGoogle, db } from '../../firebase/clientApp'
import { addDoc, collection, query, where, getDocs } from "firebase/firestore"
import { Button, Space, Table } from 'antd';
import Wrapper from '../../components/Wrapper';
import Link from 'next/link';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const Receitas = ({ data }) => {
  const router = useRouter()

  const columns = [
    { title: 'Receita', dataIndex: 'name', key: 'name' },
    { title: 'Ingredientes', dataIndex: 'ingredients', key: 'ingredients', render: item => item.length },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
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
      <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={() => router.push('/receitas/criar')}>
        Adicionar
      </Button>

      <Table dataSource={data} columns={columns} />
    </Wrapper>
  );
}

export async function getStaticProps() {
  const ref = collection(db, "recipe");
  const querySnapshot = await getDocs(ref);

  const data = []
  querySnapshot.forEach((doc) => {
    data.push({ key: doc.id, ...doc.data() })
  });

  return {
    props: { data }
  }
}

export default Receitas