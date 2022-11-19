import { useEffect } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import routes from './routes'

// 手写封装前置路由守卫
const ToPage1 = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/page1')
	}, [])

	return <div></div>
}

const ToLogin = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/login')
	}, [])
	return <div></div>
}

const BeforeRouterEnter = () => {
	// outlet实则是ReactElement | JSX.Element，也就是一个组件
	const outlet = useRoutes(routes)
	const location = useLocation()

	// 1. 访问登录页面，有合法token，跳转首页
	// 2. 访问非登录页面，无合法token，跳转登录
	// 3. 其余正常放行

	const token = localStorage.getItem('x-auth-token')
	if (location.pathname === '/login' && token) {
		// 这里不能直接用useNavigate实现跳转！！！
		// 因为要返回一个正常的JSX.Element, 也就是一个组件
		return <ToPage1 />
	}

	if (location.pathname !== '/login' && !token) {
		return <ToLogin />
	}

	// 其余放行
	return outlet // 要返回一个组件
}

export default function App() {
	return (
		<div>
			<BeforeRouterEnter />
		</div>
	)
}
