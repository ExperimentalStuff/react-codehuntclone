import React from 'react';
import ProductList from '../Product/ProductList';
import Firebase from 'firebase';

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: []
		}

		// link to firebase api //
		var firebaseRef = new Firebase('https://producthunt-rainy.firebaseio.com/products');
		firebaseRef.on('value', (snapshot) => {
			var products = snapshot.val();
			// workaround for firebase return object type//
			this.setState({
				productList: [products['1'],products['2']]
			});

			console.log(products);
		});
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
								this.state.productList
								?
							<ProductList productList={this.state.productList} />
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