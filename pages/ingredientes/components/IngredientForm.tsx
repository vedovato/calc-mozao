import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
} from 'antd';

import { IngredientFormProps } from '../../../types/ingredient-form.type';

const RULE = [{ required: true, message: 'Campo obrigatório' }]
const { Option } = Select;

const IngredientForm = ({ onFinish, initialValues = {} }: IngredientFormProps) => {
  const onFinishFailed = (e: unknown) => {
    notification.error({ message: 'Oops!', description: 'Verifique os campos e tente novamente...' });
    console.error('ERROR:', JSON.stringify(e))
  };

  return (
    <Form
      name='ingredientForm'
      layout='vertical'
      // labelCol={{ span: 4 }}
      // wrapperCol={{ span: 8 }}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Ingrediente" name="name" rules={RULE} >
        <Input />
      </Form.Item>

      <Form.Item label="Preço" name="price" rules={RULE} >
        <InputNumber prefix="R$" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Quantidade" name="total_amount" rules={RULE} >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Unidade" name="unity" rules={RULE} >
        <Select style={{ width: '100%' }}>
          <Option value="ml">ml</Option>
          <Option value="g">gramas</Option>
          <Option value="un">unidade(s)</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" shape='round' size='large' htmlType="submit">
          Salvar Ingrediente
        </Button>
      </Form.Item>
    </Form>
  )
}

export default IngredientForm