import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '@/views/Login'

const Home = lazy(() => import('@/views/Home'))
const Page1 = lazy(() => import('@/views/Page1'))
const Page2 = lazy(() => import('@/views/Page2'))
const Page301 = lazy(() => import('@/views/Page301'))
const Page302 = lazy(() => import('@/views/Page302'))
const Page303 = lazy(() => import('@/views/Page303'))

const router = [
	{
		path: '/',
		element: <Navigate to='/page1' />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: <Home />,
		children: [
			{
				path: 'page1',
				element: <Page1 />,
			},
			{
				path: 'page2',
				element: <Page2 />,
			},
			{
				path: 'page3/page301',
				element: <Page301 />,
			},
			{
				path: 'page3/page302',
				element: <Page302 />,
			},
			{
				path: 'page3/page303',
				element: <Page303 />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/page1' />,
	},
]

export default router
