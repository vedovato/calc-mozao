import React from 'react';

import {
  Breadcrumb,
  Button,
  Col,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

const MENU = [
  { title: 'Receitas', link: '/receitas' },
  { title: 'Ingredientes', link: '/ingredientes' }
]

const { Title } = Typography;

type WrapperButtonType = {
  type?: string,
  icon: React.ReactNode,
  onClick: Function,
  label: string

}

export interface LayoutProps {
  children: React.ReactNode,
  renderButton: Array<WrapperButtonType>
  title: string,
}

const Wrapper = (props: LayoutProps) => {
  const router = useRouter()

  const _renderButtons = () => {
    return props.renderButton && (
      <Space style={{ marginBottom: 30 }}>
        {props.renderButton.map(({ label, ...item }: any, key) => (
          <Button key={key} {...item} shape="round" size="large">{label}</Button>
        ))}
      </Space>
    )
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[router.pathname]}
          items={
            MENU.map((item, key) => ({
              label: item.title,
              onClick: () => router.push(item.link),
              key: item.link
            }))}
        />
      </Header>

      <Content className="site-layout" style={{ padding: '0 3%', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Mozão</Breadcrumb.Item>
          <Breadcrumb.Item>Te</Breadcrumb.Item>
          <Breadcrumb.Item>Amo</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-background" style={{ padding: 24 }}>
          <>
            <Row>
              {props.title && (
                <Col span={12}>
                  <Title>{props.title}</Title>
                </Col>
              )}

              {props.renderButton && (
                <Col flex='auto' style={{ textAlign: 'right' }}>
                  <Space>{_renderButtons()}</Space>
                </Col>
              )}
            </Row>
          </>

          {props.children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Precificador do Mozão ©2022
      </Footer>
    </Layout >
  );
}

export default Wrapper;