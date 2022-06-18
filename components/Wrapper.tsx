import React from 'react';

import {
  Breadcrumb,
  Layout,
  Menu,
} from 'antd';
import { useRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

const MENU = [
  { title: 'Receitas', link: '/receitas' },
  { title: 'Ingredientes', link: '/ingredientes' }
]

export interface LayoutProps {
  children: React.ReactNode
}

const Wrapper = (props: LayoutProps) => {
  const router = useRouter()

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
        {/* <div className="logo" /> */}

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={
            MENU.map((item, key) => ({
              label: item.title,
              onClick: () => router.push(item.link),
              key
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
          {props.children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Precificador do Mozão ©2022
      </Footer>
    </Layout>
  );
}

export default Wrapper;