import React from 'react';
import ProductList from '../Product/ProductList';
import Firebase from 'firebase';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

@connectToStores
class HomePage extends React.Component {
	constructor() {
		super();

		/* deprecated: data flow shift to dispatcher
		this.state = {
			productList: []
		}
		*/

		// link to firebase api //
		/*
		var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com/products');
		firebaseRef.on('value', (snapshot) => {
			var products = snapshot.val();
			// workaround for firebase return object type//
			this.setState({
				productList: [products['1'],products['2']]
			});

			console.log(products);
		});
		*/
		Actions.getProducts();
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}

	render(){
		return (
				<section>
					<header>
						<img src="/img/banner.jpeg" width="100%" /> 
					</header>

					<section>
						<section className="container">
							{
								this.props.products
								?
							<ProductList productList={this.props.products} />
								:
								null
							}
						</section>
					</section>
				</section>
			);
	}
}

export default HomePage;