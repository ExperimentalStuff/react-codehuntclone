import React from 'react';
import Popup from './Popup';
import Firebase from 'firebase';

class LoginPopup extends React.Component {
	handleLogin = () => {
		var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com');
		firebaseRef.authWithOAuthPopup('facebook', (error, user) => {
			if (error) {
				console.log('Failed!', error);
			} else {
				console.log('Login successfully!', user);
			}
		});
	};

	render (){
		return (
				<Popup {...this.props} style="login-popup">
					<img src="/img/kitty.png"/>
					<h1>Login to Join Community</h1>
					<p>ProductHunt is a community to share and geek out about the latest code, podcast and new stuff.</p>
					<button className="facebook-btn" onClick={this.handleLogin}>Login with Facebook</button>
					<p>We'll never post to Facebook without your permission</p>
				</Popup>
			);
	}
}

export default LoginPopup;