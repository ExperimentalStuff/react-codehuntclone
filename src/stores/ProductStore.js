import alt from '../alt';
import Actions from '../actions';
import {decorate, bind} from 'alt-utils/lib/decorators';

@decorate(alt)

class ProductStore {
	constructor (){
		this.state = {
			user: null,
			products: []
		};
	}

	@bind(Actions.login, Actions.initSession, Actions.logout)
	setUser(user) {
		this.setState({user: user});
	}

	@bind(Actions.getProducts)
	getProducts(products) {
		// work around because firebase return products as object but not array
		var productArray = Object.keys(products).map(function(key){return products[key];});
		this.setState({products: productArray});
	}
}

export default alt.createStore(ProductStore);