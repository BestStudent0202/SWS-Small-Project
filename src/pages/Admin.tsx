import React, { useEffect, useState } from 'react'
import {Breadcrumb, Button, Card, Form, Input, Layout, Menu, Modal, Table} from 'antd'
import { Typography } from 'antd';
import { DeleteOutlined, EditOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import '../App.css'
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { TreeNode } from 'antd/es/tree-select';
import { auth } from '../config/firebase';
import { ColumnsType } from 'antd/es/table';
import IPageProps from '../interfaces/page';

const { Title } = Typography;

const {Header,Footer,Sider,Content}=Layout
interface DataType {
    key?:string
    id?: string;
    userId?: string;
    title?: string;
    body?: string;
  }
 

const Admin: React.FunctionComponent<IPageProps> = props => {
    let test:DataType[]=[{ id:'1',userId:'1',title:"010"},{ id:'1',userId:'2',title:"010"}];
    test=new Array(2)
    let num:number=0;
    let data:DataType[]=[{ id:'1',userId:'1',title:"010"},{ id:'1',userId:'2',title:"010"}];    
    const col: ColumnsType<DataType> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            
          },
        {
          title: 'userId',
          dataIndex: 'userId',
          key: 'userId',
          
        },
        {
          title: 'title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'body',
          key: 'body',
          dataIndex: 'body',
        },
        {
            title: 'Actions',
            key: 'Actions',
            render:(record)=>{
                return (
                    <>
                      <EditOutlined
                        onClick={() => {
                          onEdit(record);
                        }}
                      />
                      <DeleteOutlined
                        onClick={() => {
                          onDelete(record);
                        }}
                        style={{ color: "red", marginLeft: 12 }}
                      />
                    </> 
                )  
            }
          },
      ];
      
    const [isLoading, setLoading]= useState<boolean>(true);
    const [dataS, setDataS] = useState<any[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<DataType>();
    let tempRecord:DataType={ id:'1',userId:'1',title:"010"};
    const [isLoadingData, setLoadingData]= useState<boolean>(true);
      useEffect(() => { // useEffect hook
        setTimeout(() => { // simulate a delay
          fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
            .then(json => {
              console.log(json)
              let result =JSON.stringify(json)
              let parsed = JSON.parse(result);
              data=new Array(parsed.length)
              for (let i = 0; i < parsed.length; i++) {
                data[i]={key:parsed[i].id.toString(),id:parsed[i].id.toString(), userId:parsed[i].userId.toString(),title:parsed[i].title,body:parsed[i].body};
              }
              setLoading(false)
              setDataS(data)
              console.log(data[10].userId)
            })
        }, 3000);
      }, []);
      useEffect(() => {
        setTimeout(() => {

          console.log('edit data '+editData?.id)
          console.log('lodaing set'+ isLoadingData)
          
        }, 5000);
      });

      if (isLoading) {
          console.log("hmmm??")
          return (
            <div style={{display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",}}>
            Loading the Data
            <script>console.log("Loading state")</script>
            </div>
                          
                        /* <div style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100vh",
                        }}>
                          Loading the data {console.log("loading state")}</div>*/
            );
        }
      function onEdit(record: any) {
        console.log("record: "+record.id)
        setEditData(record)
        setLoadingData(false)
        setIsModalOpen(true)
        console.log(tempRecord.id)

      } 
    const handleOk = () => {
        setIsModalOpen(false);
        setLoadingData(true)
      };
    const handleCancel = () => {
        setIsModalOpen(false);
        setLoadingData(true)
      };
    const onFinish = (values: DataType) => {
      console.log(values.id)
      setLoadingData(true)
      edit(values);

    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    function edit(values: DataType){
      let id=editData?.id
      let userId=editData?.userId
      let webString:string
      webString='https://jsonplaceholder.typicode.com/posts/'+ id
      
      setTimeout(() => {
        console.log('Success:', id);
        fetch(webString, {
          method: 'PUT',
          body: JSON.stringify({
            id: id,
            title: values.title,
            body: values.body,
            userId: userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
        
      }, 7000);
      
    }
                    
    return (
        <>
        <Layout  style={{minHeight:"100vh"}}>
            <Header style={{}}>
            <Avatar style={{ backgroundColor: '#87d068' ,float:'right'}} icon={<UserOutlined />} />
            <Title style={{color:'white'}} level={3}>Admin Panel Welcome {auth.currentUser?.email} </Title>
            </Header>
        <Layout>
          <Sider style={{}}>
                <Menu 
                defaultSelectedKeys={["Dashboard"]}
                mode='inline'
                >
                    
                    <Menu.Item key='Dashboard'>
                        Dashboard
                    </Menu.Item>
                    <SubMenu title={
                    <span>
                            <MailOutlined />
                            <span>About Us</span>
                            
                    </span>}>
                        <Menu.ItemGroup key ="About Us" title='country'>
                            <Menu.Item key='location1'>Location 1</Menu.Item>
                            <Menu.Item key='location2'>Location 2</Menu.Item>
                            <Menu.Item key='location3'>Location 3</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
          </Sider>
          <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                
          </Breadcrumb>
          <div className="site-layout-content" >
          <Card size="small" title="Summaries"  style={{ width: 300 }}>
          <div style={{display:'flex'}}>
            <div style={{ paddingLeft:10,paddingRight:10,color:'white' ,backgroundColor:'red',borderRadius:'25px'}}>
                    <p>Unassigned Bin</p>
            </div>
            <div style={{paddingRight:40}}>
    
            </div>
            <div style={{paddingLeft:10,paddingRight:10,color:'white' ,backgroundColor:'green',borderRadius:'25px'}}>
                    <p>Assigned Bin</p>
            </div>
          </div>
          <div style={{display:'flex'}}>
            <div style={{paddingLeft:30,paddingRight:100}}>
                <p>Big Bin:</p>
                <p style={{paddingLeft:20}}>{num}</p>
            </div>
            <div>
                <p>small Bin:</p>
                <p style={{paddingLeft:20}}>{num}</p>
            </div>
          </div>
          
          
        </Card>
          </div>
          <div>
          <script>console.log(dataS)</script>  
          <Table columns={col} dataSource={dataS}/>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            //initialValues={{ title: tempRecord?.title, body:tempRecord?.body }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
>
            <Form.Item
                label="title"
                name="title"
                rules={[{ required: false }]}
            >
            <Input />
            </Form.Item>

            <Form.Item
                label="body"
                name="body"
                rules={[{ required: false}]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
        </Modal>
          </div>
          
        </Content>
            <Footer style={{textAlign:'center'}}>Footer</Footer>
          </Layout>
        </Layout>
            
            
        </Layout>
        </>
        
    );
}
export default Admin;



function onDelete(record: any) {
    let webString:string
    webString='https://jsonplaceholder.typicode.com/posts/'+ record.id
    Modal.confirm({
        title: "Are you sure, you want to delete this  record?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
           
        
            fetch(webString, {
             method: 'DELETE',
        });
        console.log("DELETE SUCESS" + record.id)
        
        },
      });
}

