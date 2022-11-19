import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import 'reset-css'
import './assets/styles/global.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<Suspense fallback={<div>loading...</div>}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Suspense>
	</Provider>
)
