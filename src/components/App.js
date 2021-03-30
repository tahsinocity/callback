import '../App.css';
import React, { useEffect, useState } from 'react';
import Video from './Video';
import axios from 'axios';

function App() {
	const [state, setState] = useState({ roomId: '' });

	useEffect(() => {
		axios.get('http://localhost:8080/').then((data) => {
			setState({
				roomId: data.data,
			});
		});
	}, []);

	return (
		<div className="App">
			<div className="App-header">
				<h1>callback</h1>
				<div id="video-grid">
					<Video roomId={state} />
				</div>
			</div>
		</div>
	);
}

export default App;
