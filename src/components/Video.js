import '../App.css';
import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:8080';

export default function Video({ roomId }) {
	const videoEl = useRef(null);

	useEffect(() => {
		if (!videoEl) {
			return;
		}
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				let video = videoEl.current;
				video.srcObject = stream;
				video.play();
			});
	}, [videoEl]);

	return <video ref={videoEl} />;
}
