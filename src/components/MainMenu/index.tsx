import React, { useState, MouseEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem
}

const items: MenuItem[] = [
	getItem('Column 1', '/page1', <PieChartOutlined />),
	getItem('Column 2', '/page2', <DesktopOutlined />),
	getItem('Column 3', '/page3', <UserOutlined />, [
		getItem('Column301', '/page3/page301'),
		getItem('Column302', '/page3/page302'),
		getItem('Column303', '/page3/page303'),
	]),
	getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	getItem('Files', '9', <FileOutlined />),
]

const MainMenu: React.FC = () => {
	const navigate = useNavigate()
	const currPath = useLocation()

	let firstOpenKey: string = ''

	const findKey = (item: MenuItem) => {
		return item?.key === currPath.pathname
	}

	// tsconfig.json   "suppressImplicitAnyIndexErrors": true
	for (let i = 0; i < items.length; i++) {
		if (items[i]!['children'] && items[i]!['children'].find(findKey)) {
			firstOpenKey = items[i]!.key as string
			break
		}
	}

	// find 查找出第一个符合条件的数组成员，并返回其value

	// 设置只有一个展开项，openkeys是数组
	// 这里不能写死初始值，因为当刷新时，highlight会丢失
	// 要让当前高亮项(MainMenu下的defaultSelectedKeys)上的openKey与有children的item的key做比较
	// 有match的，就要拿当前高亮项的上一级的key作为openKey
	const [currOpen, setCurrOpen] = useState<string[]>([firstOpenKey])

	const menuClick = (e: { key: string }) => {
		navigate(e.key)
	}

	const handleOpenChange = (openKeys: string[]) => {
		setCurrOpen([openKeys[openKeys.length - 1]])
	}

	return (
		<Menu
			theme='dark'
			// 默认高亮选中项
			defaultSelectedKeys={[currPath.pathname]}
			mode='inline'
			items={items}
			onClick={(e) => menuClick}
			// 菜单展开和回收的事件
			onOpenChange={handleOpenChange}
			// 当前菜单展开项的key数组
			openKeys={currOpen}
		/>
	)
}

export default MainMenu
