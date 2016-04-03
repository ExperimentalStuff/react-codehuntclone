import React from 'react';
import ProductList from '../Product/ProductList';

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: [
				{
					id: 1,
					name: 'CodeAcademy',
					link: 'https://codeacademy.com',
					media: "/img/codecademy.jpeg",
					upvote: 169,
					description: "code for anyone",
					maker: {
						name: 'hieu',
						avatar: '/img/hieu.jpeg'
					}
				},
				{
					id: 2,
					name: 'Code4Startup',
					link: 'https://code4startup.com',
					media: '/img/code4startup.jpeg',
					upvote: 200,
					description: "code for startup",
					maker: {
						name: 'leo',
						avatar: '/img/leo.jpeg'
					}
				}
			]
		}
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