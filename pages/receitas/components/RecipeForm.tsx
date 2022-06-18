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
import {
  calcularCusto,
  toReal,
} from '../../../utils/calculo.util';

const RULE = [{ required: true, message: 'Campo obrigatório' }]
const { Option } = Select;

const RecipeForm = ({ onFinish, initialValues = {}, ingredients, setTotal }: RecipeFormProps) => {
  const onFinishFailed = (e: unknown) => {
    notification.error({ message: 'Oops!', description: 'Verifique os campos e tente novamente...' });
    console.error('ERROR:', JSON.stringify(e))
  };

  return (
    <Form
      name="recipeForm"
      // labelCol={{ span: 4 }}
      // wrapperCol={{ span: 14 }}
      layout='vertical'
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={(_, values) => {
        const val: number = calcularCusto(values.ingredients, ingredients)
        setTotal(toReal(val))
      }}
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
                  rules={RULE}
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
                  rules={RULE}
                >
                  <Input type='number' placeholder="Last Name" />
                </Form.Item>

                <Form.Item label="Unidade" name={[name, 'unity']} rules={RULE} >
                  <Select style={{ width: '100%' }}>
                    <Option value="ml">ml</Option>
                    <Option value="g">gramas</Option>
                    <Option value="un">unidade(s)</Option>
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

      <Form.Item>
        <Button type="primary" shape='round' size='large' htmlType="submit">
          Salvar Receita
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RecipeForm