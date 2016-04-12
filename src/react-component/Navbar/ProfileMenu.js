import React from 'react';
import Actions from '../../actions';

class ProfileMenu extends React.Component {
	constructor (){
		super();
		this.state = {
			showProfileNav: false
		}
	}

	handleClick = () => {
		if (this.state.showProfileNav) {
			this.setState({showProfileNav: false});
		} else {
			this.setState({showProfileNav: true});
		}
	};

	// close profile menu when anywhere outside the menu is clicked 
	handleClickOutside = (e) => {
		if (e.target != this.refs.profileBtn) {
			this.setState({showProfileNav: false});
		}
	};

	handleLogout = (e) => {
		e.preventDefault();
		Actions.logout();
	};

	// componentWillMount content will be executed before this component is rendered//
	componentWillMount (){
		window.addEventListener("click", this.handleClickOutside, false);
	}

	// componentWillUnMount content will be executed before this component is removed//
	componentWillUnMount (){
		window.removeEventListener("click", this.handleClickOutside, false);
	}

	renderProfileNav (){
		return (
			<nav className="profile-nav" ref="profileNav">
				<a href="#">My Profile</a>
				<a href="#" onClick={this.handleLogout} >Logout</a>
			</nav>
		);		
	}

	render (){
		return (
				<section className="profile-menu">
					<img src={this.props.user.avatar} onClick={this.handleClick} className="profile-btn medium-avatar" ref="profileBtn"/>
					{
						this.state.showProfileNav
						?
						this.renderProfileNav()
						:
						null
					}
				</section>
			);
	}

}

export default ProfileMenu;