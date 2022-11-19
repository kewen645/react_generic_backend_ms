import React, { useState } from 'react'
import MainMenu from '@/components/MainMenu'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout } from 'antd'

const { Header, Content, Footer, Sider } = Layout

const Home: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	// const navigate = useNavigate()
	// const menuClick = (e: any) => {
	// 	navigate(e.key)
	// }

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className='logo' />
				<MainMenu />
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ paddingLeft: '16px' }}>
					<Breadcrumb style={{ lineHeight: '64px' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
				</Header>
				<Content style={{ margin: '16px 16px 0' }} className='site-layout-background'>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>footer</Footer>
			</Layout>
		</Layout>
	)
}

export default Home
