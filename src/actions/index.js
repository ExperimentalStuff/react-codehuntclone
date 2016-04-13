import alt from '../alt';
import Firebase from 'firebase';
import _ from 'lodash';

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

	getProducts() {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com/products');
			firebaseRef.on('value', (snapshot) => {
				// transform object to array with only values with lodash

				// require second fix because key is also needed for upvote function
				var productsValue = snapshot.val();
				// extract key, value as array and pass key back to array 
				var products = _(productsValue).keys().map((productKey)=>{
					var item = _.clone(productsValue[productKey]);
					item.key = productKey;
					return item;
				})
				.value();

				dispatch(products);
			})
		}
	}

	addProduct(product) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com/products');

			firebaseRef.push(product);

		}
	}

	addVote(productId, userId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com');

			firebaseRef = firebaseRef.child('products').child(productId).child('upvote');

			var vote = 0;
			firebaseRef.on('value', (snapshot)=>{
				vote = snapshot.val();
			});

			firebaseRef.set(vote+1);
		}
	}

}

export default alt.createActions(Actions);