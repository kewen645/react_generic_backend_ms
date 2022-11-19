import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.scss'
import initLoginBG from './init'
import { useEffect } from 'react'
import { Input, Space, Button, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { userLogin, userLogout, selectUser } from '@/features/login/loginSlice'
import { CaptchaAPI, LoginAPI } from '@/request/api'
import './login.less'

const Login = () => {
	// 引入背景图
	useEffect(() => {
		initLoginBG()
		window.onresize = function () {
			initLoginBG()
		}
		getCaptchaImg()
	}, [])

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [captcha, setCaptcha] = useState('')
	const [captchaImg, setCaptchaImg] = useState('')

	const navigate = useNavigate()

	// redux 拿数据
	const userObj = useAppSelector(selectUser)
	const dispatch = useAppDispatch()

	const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleCaptcha = (e: ChangeEvent<HTMLInputElement>) => {
		setCaptcha(e.target.value)
	}

	const onSubmit = async () => {
		if (!username.trim() || !password.trim() || !captcha.trim()) {
			message.warn('请输入完整信息')
			return
		}

		// test account:  username: qdtest1   password: 123456
		let loginAPIRes = await LoginAPI({
			username,
			password,
			code: captcha,
			uuid: localStorage.getItem('uuid') as string,
		})

		// console.log(loginAPIRes)
		if (loginAPIRes.code === 200) {
			// 提示登录成功
			message.success('登录成功')
			// 保存token
			localStorage.setItem('x-auth-token', loginAPIRes.token)
			// 跳转/page1
			navigate('/page1')
			// 删除uuid
			localStorage.removeItem('uuid')
		}
	}

	// 获取验证码图片盒子的事件函数
	const getCaptchaImg = async () => {
		let captchaAPIRes = await CaptchaAPI()
		// console.log(captchaAPIRes)
		if (captchaAPIRes.code === 200) {
			setCaptchaImg(`data:image/gif;base64, ${captchaAPIRes.img}`)
			// console.log(captchaImg)
			localStorage.setItem('uuid', captchaAPIRes.uuid)
		}
	}

	return (
		<div className={styles.loginPage}>
			<canvas id='canvas' style={{ display: 'block' }}></canvas>
			<div className={styles.loginBox + ' loginbox'}>
				<div className={styles.title}>
					<h1>通用后台系统</h1>
					<p>Strive Everyday</p>
				</div>
				<div className='form'>
					<Space direction='vertical' size='large' style={{ display: 'flex' }}>
						<Input placeholder='username' onChange={handleUsername} />
						<Input.Password placeholder='password' onChange={handlePassword} />
						<div className='captchaBox'>
							<Input placeholder='verification code' onChange={handleCaptcha} />
							<div className='captchaImg'>
								<img height='38' src={captchaImg} alt='' onClick={getCaptchaImg} />
							</div>
						</div>
						<Button type='primary' block onClick={onSubmit}>
							Login
						</Button>
						<div>--- check redux --- </div>
						username: {userObj.username} password: {userObj.password}
						<Button type='primary' block onClick={() => dispatch(userLogin({ username: 'jack', password: 'jack123' }))}>
							modify user
						</Button>
						<Button type='primary' block onClick={() => dispatch(userLogout())}>
							del user
						</Button>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default Login
