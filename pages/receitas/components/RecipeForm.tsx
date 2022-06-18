import {
  Button,
  Form,
  Input,
  notification,
  Select,
  Space,
} from 'antd';

import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { RecipeFormProps } from '../../../types/recipe-form.type';
import { calcularValor } from '../../../utils/calculo.util';

const RULE = [{ required: true, message: 'Campo obrigatório' }]
const { Option } = Select;

const RecipeForm = ({ onFinish, initialValues = {}, ingredients, setTotal }: RecipeFormProps) => {
  const onFinishFailed = (e: unknown) => {
    notification.error({ message: 'Oops!', description: 'Verifique os campos e tente novamente...' });
    console.error('ERROR:', JSON.stringify(e))
  };

  return (
    <Form
      name="basic"
      // labelCol={{ span: 4 }}
      // wrapperCol={{ span: 14 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={(_, values) => setTotal(calcularValor(values.ingredients, ingredients))}
      autoComplete="off"
    >
      <Form.Item label="Nome da Receita" name="name" rules={RULE} >
        <Input />
      </Form.Item>

      <Form.List name="ingredients">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, iidx) => (
              <Space
                key={`${key}-${iidx}`}
                style={{ display: 'flex', marginBottom: 7 }}
                align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'id']}
                  label='Ingrediente'
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    style={{ width: '150px' }}
                    filterOption={(input, option) =>
                      (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {ingredients.map((ingredient, idx) => {
                      return (
                        <Option key={idx} value={ingredient.key}>{ingredient.name}</Option>
                      )
                    }
                    )}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  label='Quantidade'
                  name={[name, 'amount']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input type='number' placeholder="Last Name" />
                </Form.Item>

                <Form.Item label="Unidade" name={[name, 'unity']} rules={[{ required: true, message: 'Missing last name' }]} >
                  <Select style={{ width: '100%' }}>
                    <Option value="ml">ml</Option>
                    <Option value="g">gramas</Option>
                  </Select>
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Adicionar Ingrediente
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RecipeForm