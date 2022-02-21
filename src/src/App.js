import SignUp from './components/SignUp/SignUp';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';

function App() {
	return (
		<>
			<Routes>
				<Route path='*' element={<Navigate to='/SignUp' replace />} />
				<Route path='/SignUp' element={<SignUp />} />
				<Route path='/Login' element={<Login />} />
			</Routes>
		</>
	)
}

export default App;
