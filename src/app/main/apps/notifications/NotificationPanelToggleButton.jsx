import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleNotificationPanel } from './notificationPanelSlice';
import { useGetAllNotificationsQuery } from './NotificationApi';

/**
 * The notification panel toggle button.
 */
function NotificationPanelToggleButton(props) {
	const { children = <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon> } = props;
	const { data: notifications } = useGetAllNotificationsQuery();
	const dispatch = useAppDispatch();
	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleNotificationPanel())}
			size="large"
		>
			<Badge
				color="secondary"
				variant="dot"
				invisible={notifications?.length === 0}
			>
				{children}
			</Badge>
		</IconButton>
	);
}

export default NotificationPanelToggleButton;