import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleQuickPanel } from './quickPanelSlice';

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props) {
	const { children = <FuseSvgIcon>heroicons-outline:bookmark</FuseSvgIcon> } = props;
	const dispatch = useAppDispatch();
	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleQuickPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
