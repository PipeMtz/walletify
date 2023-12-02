import React from 'react';
import { Button, Typography, Layout } from 'antd';
import { ArrowDownOutlined, DollarOutlined, LineChartOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Styles from './landing.module.css'

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const App = () => (
  <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center', width: '100vw' }}>
    <Header style={{ 
      background: 'white', 
      width: '100%' , 
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',

      }}>
      <Title level={2} style={{color:'#c75dae', marginTop:'15px'}}>
        Walletify
      </Title>
    </Header>
    <Content style={{ padding: '50px', backgroundImage: 'url(https://unbounce.com/photos/Gradient-Background.png)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
      <Title style={{ color: 'white', fontSize:'1.5em' , margin:'0'}} level={1}>Manage Multiple Wallets with Ease</Title>
      <Paragraph style={{ fontSize: '5em', fontWeight:'bold', color: 'white' , margin:'0', lineHeight:'80px', maxWidth:'24ch', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
        Save, transfer, and grow your money without any hassle.
      </Paragraph>
      <ul className={Styles.containerList}>
        <li className={Styles.containerIcon}>
          <DollarOutlined className={Styles.icon} />
          <p className={Styles.textUi}>Savings and debit without absurd conditions</p>
          </li>
        <li className={Styles.containerIcon}>
          <LineChartOutlined className={Styles.icon}/>
          <p className={Styles.textUi}>Create unlimited wallets and invest your money</p>
        </li>
        <li className={Styles.containerIcon}>
          <CreditCardOutlined className={Styles.icon}/>
          <p className={Styles.textUi}>Check your wallets anywhere in the world</p>
          </li>
      </ul>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <Button type='primary' style={{ margin: '0 10px' }}>
          <Link to="/Login" style={{ color: 'white' }}>
            Login
          </Link>
        </Button>
        <Button type="secondary">
          <Link to="/Register" style={{ color: 'white' }}>
            Register
          </Link>
        </Button>
      </div>
      {/* You can add your custom scroll indicator here */}
      <ArrowDownOutlined style={{ fontSize: '2em', color: 'white', marginTop: '20px', cursor: 'pointer' }} />
    </Content>
    <Footer style={{ textAlign: 'center', color: 'black' }}>
      Walletify LLC ©2023 Created by Walletify Team
    </Footer>
  </Layout>
);

export default App;
