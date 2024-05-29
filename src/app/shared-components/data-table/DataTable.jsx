import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import _ from '@lodash';
import { useMemo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import DataTableTopToolbar from './DataTableTopToolbar';

const tableIcons = {
	ArrowDownwardIcon: (props) => (
		<FuseSvgIcon
			size={20}
			{...props}
		>
			heroicons-outline:arrow-down
		</FuseSvgIcon>
	),
	ClearAllIcon: () => <FuseSvgIcon size={20}>heroicons-outline:menu-alt-3</FuseSvgIcon>, // Adjusted, closest match
	DensityLargeIcon: () => <FuseSvgIcon size={20}>heroicons-outline:menu-alt-4</FuseSvgIcon>, // Adjusted, closest match
	DensityMediumIcon: () => <FuseSvgIcon size={20}>heroicons-outline:menu</FuseSvgIcon>, // Adjusted, closest match
	DensitySmallIcon: () => <FuseSvgIcon size={20}>heroicons-outline:view-list</FuseSvgIcon>, // Adjusted, closest match
	DragHandleIcon: () => (
		<FuseSvgIcon
			className="rotate-45"
			size={16}
		>
			heroicons-outline:arrows-expand
		</FuseSvgIcon>
	), // Adjusted, closest match
	FilterListIcon: (props) => (
		<FuseSvgIcon
			size={16}
			{...props}
		>
			heroicons-outline:filter
		</FuseSvgIcon>
	),
	FilterListOffIcon: () => <FuseSvgIcon size={20}>heroicons-outline:filter</FuseSvgIcon>, // Heroicons may not have a direct match for "off" state; consider custom handling
	FullscreenExitIcon: () => <FuseSvgIcon size={20}>heroicons-outline:arrows-expand</FuseSvgIcon>, // Adjusted, closest match
	FullscreenIcon: () => <FuseSvgIcon size={20}>heroicons-outline:arrows-expand</FuseSvgIcon>,
	SearchIcon: (props) => (
		<FuseSvgIcon
			color="action"
			size={20}
			{...props}
		>
			heroicons-outline:search
		</FuseSvgIcon>
	),
	SearchOffIcon: () => <FuseSvgIcon size={20}>heroicons-outline:search</FuseSvgIcon>, // Heroicons may not have a direct match for "off" state; consider custom handling
	ViewColumnIcon: () => <FuseSvgIcon size={20}>heroicons-outline:view-boards</FuseSvgIcon>,
	MoreVertIcon: () => <FuseSvgIcon size={20}>heroicons-outline:dots-vertical</FuseSvgIcon>,
	MoreHorizIcon: () => <FuseSvgIcon size={20}>heroicons-outline:dots-horizontal</FuseSvgIcon>,
	SortIcon: (props) => (
		<FuseSvgIcon
			size={20}
			{...props}
		>
			heroicons-outline:sort-ascending
		</FuseSvgIcon>
	), // Adjusted, closest match
	PushPinIcon: (props) => (
		<FuseSvgIcon
			size={20}
			{...props}
		>
			heroicons-outline:thumb-tack
		</FuseSvgIcon>
	), // Adjusted, closest match
	VisibilityOffIcon: () => <FuseSvgIcon size={20}>heroicons-outline:eye-off</FuseSvgIcon>
};

function DataTable(props) {
	const { columns, data, ...rest } = props;
	const defaults = useMemo(
		() =>
			_.defaults(rest, {
				initialState: {
					density: 'spacious',
					showColumnFilters: false,
					showGlobalFilter: true,
					columnPinning: {
						left: ['mrt-row-expand', 'mrt-row-select'],
						right: ['mrt-row-actions']
					},
					pagination: {
						pageSize: 15
					},
					enableFullScreenToggle: false
				},
				enableFullScreenToggle: false,
				enableColumnFilterModes: true,
				enableColumnOrdering: true,
				enableGrouping: true,
				enableColumnPinning: true,
				enableFacetedValues: true,
				enableRowActions: true,
				enableRowSelection: true,
				muiBottomToolbarProps: {
					className: 'flex items-center min-h-56 h-56'
				},
				muiTablePaperProps: {
					elevation: 0,
					square: true,
					className: 'flex flex-col flex-auto h-full'
				},
				muiTableContainerProps: {
					className: 'flex-auto'
				},
				enableStickyHeader: true,
				// enableStickyFooter: true,
				paginationDisplayMode: 'pages',
				positionToolbarAlertBanner: 'top',
				muiPaginationProps: {
					color: 'secondary',
					rowsPerPageOptions: [10, 20, 30],
					shape: 'rounded',
					variant: 'outlined',
					showRowsPerPage: false
				},
				muiSearchTextFieldProps: {
					placeholder: 'Search',
					sx: { minWidth: '300px' },
					variant: 'outlined',
					size: 'small'
				},
				muiFilterTextFieldProps: {
					variant: 'outlined',
					size: 'small',
					sx: {
						'& .MuiInputBase-root': {
							padding: '0px 8px',
							height: '32px!important',
							minHeight: '32px!important'
						}
					}
				},
				muiSelectAllCheckboxProps: {
					className: 'w-48'
				},
				muiSelectCheckboxProps: {
					className: 'w-48'
				},
				muiTableBodyRowProps: ({ row, table }) => {
					const { density } = table.getState();

					if (density === 'compact') {
						return {
							sx: {
								backgroundColor: 'initial',
								opacity: 1,
								boxShadow: 'none',
								height: row.getIsPinned() ? `${37}px` : undefined
							}
						};
					}

					return {
						sx: {
							backgroundColor: 'initial',
							opacity: 1,
							boxShadow: 'none',
							// Set a fixed height for pinned rows
							height: row.getIsPinned() ? `${density === 'comfortable' ? 53 : 69}px` : undefined
						}
					};
				},
				muiTableHeadCellProps: ({ column }) => ({
					sx: {
						'& .Mui-TableHeadCell-Content-Labels': {
							flex: 1,
							justifyContent: 'space-between'
						},
						'& .Mui-TableHeadCell-Content-Actions': {},
						'& .MuiFormHelperText-root': {
							textAlign: 'center',
							marginX: 0,
							color: (theme) => theme.palette.text.disabled,
							fontSize: 11
						},
						backgroundColor: (theme) => (column.getIsPinned() ? theme.palette.background.paper : 'inherit')
					}
				}),
				mrtTheme: (theme) => ({
					baseBackgroundColor: theme.palette.background.paper,
					menuBackgroundColor: theme.palette.background.paper,
					pinnedRowBackgroundColor: theme.palette.background.paper,
					pinnedColumnBackgroundColor: theme.palette.background.paper
				}),
				renderTopToolbar: (_props) => <DataTableTopToolbar {..._props} />,
				icons: tableIcons
			}),
		[rest]
	);
	const table = useMaterialReactTable({
		columns,
		data,
		...defaults,
		...rest
	});
	return <MaterialReactTable table={table} />;
}

export default DataTable;
