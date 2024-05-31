import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch } from 'app/store/hooks';
import { toggleChatPanel } from './messengerPanelSlice';

/**
 * The chat panel toggle button.
 */
function MessengerPanelToggleButton(props) {
	const { children } = props;
	const dispatch = useAppDispatch();
	return (
		<IconButton
			className="w-40 h-40"
			onClick={() => dispatch(toggleChatPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

MessengerPanelToggleButton.defaultProps = {
	children: <FuseSvgIcon>heroicons-outline:chat</FuseSvgIcon>
};
export default MessengerPanelToggleButton;
