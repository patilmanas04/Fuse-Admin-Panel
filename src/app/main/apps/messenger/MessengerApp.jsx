import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { createContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import MainSidebar from './sidebars/main/MainSidebar';
import EmployeeSidebar from './sidebars/employee/EmployeeSidebar';
import UserSidebar from './sidebars/user/UserSidebar';

const drawerWidth = 400;
export const ChatAppContext = createContext({
	setMainSidebarOpen: () => {},
	setEmployeeSidebarOpen: () => {},
	setUserSidebarOpen: () => {}
});
const Root = styled(FusePageSimple)(() => ({
	'& .FusePageSimple-content': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		height: '100%'
	}
}));
const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		maxWidth: '100%',
		overflow: 'hidden',
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	}
}));

/**
 * The chat app.
 */
function MessengerApp() {
	const location = useLocation();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [mainSidebarOpen, setMainSidebarOpen] = useState(!isMobile);
	const [employeeSidebarOpen, setEmployeeSidebarOpen] = useState(false);
	const [userSidebarOpen, setUserSidebarOpen] = useState(false);
	useEffect(() => {
		setMainSidebarOpen(!isMobile);
	}, [isMobile]);
	useEffect(() => {
		if (isMobile) {
			setMainSidebarOpen(false);
		}
	}, [location, isMobile]);
	useEffect(() => {
		if (isMobile && userSidebarOpen) {
			setMainSidebarOpen(false);
		}
	}, [isMobile, userSidebarOpen]);
	const ChatAppContextData = useMemo(
		() => ({
			setMainSidebarOpen,
			setEmployeeSidebarOpen,
			setUserSidebarOpen
		}),
		[setMainSidebarOpen, setEmployeeSidebarOpen, setUserSidebarOpen]
	);
	return (
		<ChatAppContext.Provider value={ChatAppContextData}>
			<Root
				content={<Outlet />}
				leftSidebarContent={<MainSidebar />}
				leftSidebarOpen={mainSidebarOpen}
				leftSidebarOnClose={() => {
					setMainSidebarOpen(false);
				}}
				leftSidebarWidth={400}
				rightSidebarContent={<EmployeeSidebar />}
				rightSidebarOpen={employeeSidebarOpen}
				rightSidebarOnClose={() => {
					setEmployeeSidebarOpen(false);
				}}
				rightSidebarWidth={400}
				scroll="content"
			/>
			<StyledSwipeableDrawer
				className="h-full absolute z-9999"
				variant="temporary"
				anchor="left"
				open={userSidebarOpen}
				onOpen={() => {}}
				onClose={() => setUserSidebarOpen(false)}
				classes={{
					paper: 'absolute left-0'
				}}
				style={{ position: 'absolute' }}
				ModalProps={{
					keepMounted: false,
					disablePortal: true,
					BackdropProps: {
						classes: {
							root: 'absolute'
						}
					}
				}}
			>
				<UserSidebar />
			</StyledSwipeableDrawer>
		</ChatAppContext.Provider>
	);
}

export default MessengerApp;
