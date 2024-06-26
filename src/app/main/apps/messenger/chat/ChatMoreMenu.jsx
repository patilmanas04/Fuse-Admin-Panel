import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ChatAppContext } from '../MessengerApp';

/**
 * The main sidebar more menu.
 */
function MainSidebarMoreMenu(props) {
	const { setEmployeeSidebarOpen } = useContext(ChatAppContext);
	const { className } = props;
	const [moreMenuEl, setMoreMenuEl] = useState(null);

	function handleMoreMenuClick(event) {
		setMoreMenuEl(event.currentTarget);
	}

	function handleMoreMenuClose() {
		setMoreMenuEl(null);
	}

	return (
		<div className={className}>
			<IconButton
				aria-haspopup="true"
				onClick={handleMoreMenuClick}
				size="large"
			>
				<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
			</IconButton>
			<Menu
				id="chats-more-menu"
				anchorEl={moreMenuEl}
				open={Boolean(moreMenuEl)}
				onClose={handleMoreMenuClose}
			>
				<MenuItem
					onClick={() => {
						setEmployeeSidebarOpen(true);
						handleMoreMenuClose();
					}}
				>
					Employee info
				</MenuItem>
			</Menu>
		</div>
	);
}

export default MainSidebarMoreMenu;
