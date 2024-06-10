/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import DataTable from './DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Chip, ListItemIcon, MenuItem, Paper } from '@mui/material';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { useDeleteECommerceProductsMutation, useGetECommerceProductsQuery } from '../ECommerceApi';

function ProductsTable() {
	const { isLoading } = useGetECommerceProductsQuery();
	const [removeProducts] = useDeleteECommerceProductsMutation();
	// const columns = useMemo(
	// 	() => [
	// 		{
			// 	accessorFn: (row) => row.featuredImageId,
			// 	id: 'featuredImageId',
			// 	header: '',
			// 	enableColumnFilter: false,
			// 	enableColumnDragging: false,
			// 	size: 64,
			// 	enableSorting: false,
			// 	Cell: ({ row }) => (
			// 		<div className="flex items-center justify-center">
			// 			{row.original?.images?.length > 0 && row.original.featuredImageId ? (
			// 				<img
			// 					className="w-full max-h-40 max-w-40 block rounded"
			// 					src={_.find(row.original.images, { id: row.original.featuredImageId })?.url}
			// 					alt={row.original.name}
			// 				/>
			// 			) : (
			// 				<img
			// 					className="w-full max-h-40 max-w-40 block rounded"
			// 					src="assets/images/apps/ecommerce/product-image-placeholder.png"
			// 					alt={row.original.name}
			// 				/>
			// 			)}
			// 		</div>
			// 	)
			// },
	// 		{
	// 			accessorKey: 'name',
	// 			header: 'Name',
	// 			Cell: ({ row }) => (
	// 				<Typography
	// 					component={Link}
	// 					to={`/apps/e-commerce/products/${row.original.id}/${row.original.handle}`}
	// 					className="underline"
	// 					color="secondary"
	// 					role="button"
	// 				>
	// 					{row.original.name}
	// 				</Typography>
	// 			)
	// 		},
	// 		{
	// 			accessorKey: 'categories',
	// 			header: 'Category',
	// 			accessorFn: (row) => (
	// 				<div className="flex flex-wrap space-x-2">
	// 					{row.categories.map((item) => (
	// 						<Chip
	// 							key={item}
	// 							className="text-11"
	// 							size="small"
	// 							color="default"
	// 							label={item}
	// 						/>
	// 					))}
	// 				</div>
	// 			)
	// 		},
	// 		{
	// 			accessorKey: 'priceTaxIncl',
	// 			header: 'Price',
	// 			accessorFn: (row) => `$${row.priceTaxIncl}`
	// 		},
	// 		{
	// 			accessorKey: 'quantity',
	// 			header: 'Quantity',
	// 			accessorFn: (row) => (
	// 				<div className="flex items-center space-x-8">
	// 					<span>{row.quantity}</span>
	// 					<i
	// 						className={clsx(
	// 							'inline-block w-8 h-8 rounded',
	// 							row.quantity <= 5 && 'bg-red',
	// 							row.quantity > 5 && row.quantity <= 25 && 'bg-orange',
	// 							row.quantity > 25 && 'bg-green'
	// 						)}
	// 					/>
	// 				</div>
	// 			)
	// 		},
	// 		{
	// 			accessorKey: 'active',
	// 			header: 'Active',
	// 			accessorFn: (row) => (
	// 				<div className="flex items-center">
	// 					{row.active ? (
	// 						<FuseSvgIcon
	// 							className="text-green"
	// 							size={20}
	// 						>
	// 							heroicons-outline:check-circle
	// 						</FuseSvgIcon>
	// 					) : (
	// 						<FuseSvgIcon
	// 							className="text-red"
	// 							size={20}
	// 						>
	// 							heroicons-outline:minus-circle
	// 						</FuseSvgIcon>
	// 					)}
	// 				</div>
	// 			)
	// 		}
	// 	],
	// 	[]
	// );

	const columns = useMemo(
		() => [
			{
				accessorKey: 'no',
				header: 'No',
				accessorFn: (row) => `${row.no}`
			},
			{
				accessorKey: 'sessionName',
				header: 'Session Name',
				accessorFn: (row) => `${row.sessionName}`
			},
			{
				accessorKey: 'startTime',
				header: 'Start Time',
				accessorFn: (row) => `${row.startTime}`
			},
			{
				accessorKey: 'endTime',
				header: 'End Time',
				accessorFn: (row) => `${row.endTime}`
			},
			{
				accessorKey: 'status',
				header: 'Status',
				accessorFn: (row) => `${row.status}`
			},
		]
	)

	if (isLoading) {
		return <FuseLoading />;
	}

	const products = [
		{
			no: 1,
			sessionName: "Session 1",
			startTime: "9:00 AM",
			endTime: "10:00 AM",
			status: "Active"
		},
		{
			no: 2,
			sessionName: "Session 2",
			startTime: "10:30 AM",
			endTime: "11:30 AM",
			status: "Active"
		},
		{
			no: 3,
			sessionName: "Session 3",
			startTime: "1:00 PM",
			endTime: "2:00 PM",
			status: "Inactive"
		},
		{
			no: 4,
			sessionName: "Session 4",
			startTime: "3:00 PM",
			endTime: "4:00 PM",
			status: "Active"
		},
		{
			no: 5,
			sessionName: "Session 5",
			startTime: "5:00 PM",
			endTime: "6:00 PM",
			status: "Inactive"
		}
	];

	return (
		<Paper
			className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={products}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<>
						<MenuItem
						key={0}
						onClick={() => {
							removeProducts([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</ListItemIcon>
							Delete
						</MenuItem>
					</>
					
				]}
				renderTopToolbarCustomActions={({ table }) => {
					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								removeProducts(selectedRows.map((row) => row.original.id));
								table.resetRowSelection();
							}}
							className="flex shrink min-w-40 ltr:mr-8 rtl:ml-8"
							color="secondary"
						>
							<FuseSvgIcon size={16}>heroicons-outline:trash</FuseSvgIcon>
							<span className="hidden sm:flex mx-8">Delete selected items</span>
						</Button>
					);
				}}
			/>
		</Paper>
	);
}

export default ProductsTable;
