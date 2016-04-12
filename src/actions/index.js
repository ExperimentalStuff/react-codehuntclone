import alt from '../alt';
import Firebase from 'firebase';

class Actions {

	initSession() {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com');
			var authData = firebaseRef.getAuth();
			var user;


			if (authData) {
					user = {
						id: authData.facebook.id,
						name: authData.facebook.displayName,
						avatar: authData.facebook.profileImageURL
				}
			} else {
				user = null;
			}

			// Asynchronous: need to use setTimeout to handle

			setTimeout(()=>dispatch(user));
		}
	}

	login (){
		return (dispatch) => {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com');
			firebaseRef.authWithOAuthPopup('facebook', (error, authData) => {
				if (error) {
					return;
				}

				var user = {
					id: authData.facebook.id,
					name: authData.facebook.displayName,
					avatar: authData.facebook.profileImageURL
				}

				firebaseRef.child("users").child(authData.facebook.id).set(user);
				dispatch(user);
			});	
		}
	}

	logout() {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com');
			firebaseRef.unauth();
			setTimeout(() => dispatch(null));
		}
	}
}

export default alt.createActions(Actions);