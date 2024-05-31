import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import EmployeeStatus from './EmployeeStatus';

const Root = styled(Tooltip)(({ theme, active }) => ({
	width: 70,
	minWidth: 70,
	flex: '0 0 auto',
	...(active && {
		'&:after': {
			position: 'absolute',
			top: 8,
			right: 0,
			bottom: 8,
			content: "''",
			width: 4,
			borderTopLeftRadius: 4,
			borderBottomLeftRadius: 4,
			backgroundColor: theme.palette.primary.main
		}
	})
}));
const StyledUreadBadge = styled('div')(({ theme }) => ({
	position: 'absolute',
	minWidth: 18,
	height: 18,
	top: 4,
	left: 10,
	borderRadius: 9,
	padding: '0 5px',
	fontSize: 11,
	textAlign: 'center',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.secondary.contrastText,
	boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
	zIndex: 10
}));

/**
 * Employee button component.
 */
function EmployeeButton(props) {
	const { employee, selectedEmployeeId, onClick } = props;
	return (
		<Root
			title={employee.name}
			placement="left"
			active={selectedEmployeeId === employee.id ? 1 : 0}
		>
			<Button
				onClick={() => onClick(employee.id)}
				className={clsx(
					'employeeButton rounded-0 py-4 h-auto min-h-auto max-h-none',
					selectedEmployeeId === employee.id && 'active'
				)}
			>
				{Boolean(employee.unreadCount) && <StyledUreadBadge>{employee.unreadCount}</StyledUreadBadge>}

				<EmployeeStatus value={employee.status} />

				<Avatar
					src={employee.avatar}
					alt={employee.name}
				>
					{!employee.avatar || employee.avatar === '' ? employee.name[0] : ''}
				</Avatar>
			</Button>
		</Root>
	);
}

export default EmployeeButton;
