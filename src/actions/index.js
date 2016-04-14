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
		console.log(userId);
		return (dispatch) => {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com');

			// check for voted users, can not vote if already voted //
			var voteRef = firebaseRef.child('votes').child(productId).child(userId);
			voteRef.on('value', (snapshot)=>{
				if (snapshot.val()==null) {
					voteRef.set(true);

					firebaseRef = firebaseRef.child('products').child(productId).child('upvote');

					var vote = 0;
					firebaseRef.on('value', (snapshot)=>{
						vote = snapshot.val();
					});

					firebaseRef.set(vote+1);					
				}
			})
		}
	}

	addComment(productId, comment) {
		return (dispatch)=> {
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com/comments');

			firebaseRef.child(productId).push(comment);
		}
	}

	getComments(productId) {
		return (dispatch) =>{
			var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com/comments');
			firebaseRef.child(productId).on('value', (snapshot)=>{
				var commentsVal = snapshot.val();
				var comments = _(commentsVal).keys().map((commentKey)=>{
					var item = _.clone(commentsVal[commentKey]);
					item.key = commentKey;
					return item;
				})
				.value();

				dispatch(comments);
			});
		}
	}

}

export default alt.createActions(Actions);