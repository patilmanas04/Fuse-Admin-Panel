import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ECommerceApp = lazy(() => import('./ECommerceApp'));
const Product = lazy(() => import('./product/Product'));
const Products = lazy(() => import('./products/Products'));
/**
 * The E-Commerce app configuration.
 */
const PhotoTrackingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/photo-tracking',
			element: <ECommerceApp />,
			children: [
				{
					path: '',
					element: <Navigate to="products" />
				},
				{
					path: 'products',
					element: <Products />
				},
				{
					path: 'products/:productId/*',
					element: <Product />
				},
			]
		}
	]
};
export default PhotoTrackingAppConfig;
