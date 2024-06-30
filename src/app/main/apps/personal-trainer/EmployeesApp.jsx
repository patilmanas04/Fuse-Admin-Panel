import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import EmployeesHeader from './EmployeesHeader';
import EmployeesList from './EmployeesList';
import { useGetEmployeesListQuery, useGetEmployeesCountriesQuery, useGetEmployeesTagsQuery } from './EmployeesApi';
import EmployeesSidebarContent from './EmployeesSidebarContent';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper
	}
}));

/**
 * The EmployeesApp page.
 */
function EmployeesApp() {
	useEffect(() => {
		document.title = 'Employees';
	}, [])
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	useGetEmployeesListQuery();
	useGetEmployeesCountriesQuery();
	useGetEmployeesTagsQuery();
	useEffect(() => {
		setRightSidebarOpen(Boolean(routeParams.id));
	}, [routeParams]);
	return (
		<Root
			header={<EmployeesHeader />}
			content={<EmployeesList />}
			ref={pageLayout}
			rightSidebarContent={<EmployeesSidebarContent />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
			rightSidebarWidth={640}
			rightSidebarVariant="temporary"
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default EmployeesApp;
