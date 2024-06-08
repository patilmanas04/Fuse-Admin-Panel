import GlobalStyles from '@mui/material/GlobalStyles';
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';
import { useEffect } from 'react';

/**
 * The orders page.
 */
function Orders() {
	useEffect(() => {
		document.title = 'Suppliers';
	})

	return (
		<>
			<GlobalStyles
				styles={() => ({
					'#root': {
						maxHeight: '100vh'
					}
				})}
			/>
			<div className="w-full h-full container flex flex-col">
				<OrdersHeader />
				<OrdersTable />
			</div>
		</>
	);
}

export default Orders;
