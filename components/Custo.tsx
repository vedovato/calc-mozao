import {
  Card,
  Statistic,
} from 'antd';

import { CalculatorOutlined } from '@ant-design/icons';

type CustoType = {
  total: number | string
}

const Custo = ({ total }: CustoType) => (
  <Card style={{ marginBottom: 30 }}>
    <Statistic
      title="Custo"
      value={total}
      prefix={<CalculatorOutlined />}
      valueStyle={{ color: '#3f8600' }}
    />
  </Card>
)

export default Custo