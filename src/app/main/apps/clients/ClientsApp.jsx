import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ClientsHeader from './ClientsHeader';
import ClientsList from './ClientsList';
import { useGetClientsListQuery, useGetClientsCountriesQuery, useGetClientsTagsQuery } from './ClientsApi';
import ClientsSidebarContent from './ClientsSidebarContent';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper
	}
}));

/**
 * The ClientsApp page.
 */
function ClientsApp() {
	useEffect(() => {
		document.title = 'Clients';
	}, [])
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	useGetClientsListQuery();
	useGetClientsCountriesQuery();
	useGetClientsTagsQuery();
	useEffect(() => {
		setRightSidebarOpen(Boolean(routeParams.id));
	}, [routeParams]);
	return (
		<Root
			header={<ClientsHeader />}
			content={<ClientsList />}
			ref={pageLayout}
			rightSidebarContent={<ClientsSidebarContent />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
			rightSidebarWidth={640}
			rightSidebarVariant="temporary"
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ClientsApp;
