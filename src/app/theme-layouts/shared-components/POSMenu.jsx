import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import useAuth from 'src/app/auth/useAuth';
import { darken } from '@mui/material/styles';
import { useAppSelector } from 'app/store/hooks';
import { useNavigate } from 'react-router-dom';

/**
 * The user menu.
 */
function POSMenu() {
	const Navigate = useNavigate();
	const user = useAppSelector(selectUser);
	const { signOut } = useAuth();
	const [userMenu, setUserMenu] = useState(null);
	const userMenuClick = (event) => {
		setUserMenu(event.currentTarget);
	};
	const userMenuClose = () => {
		setUserMenu(null);
	};

	if (!user) {
		return null;
	}

	return (
		<>
			<Button
				className="min-h-40 min-w-40 p-0 md:px-16 md:py-6"
				onClick={userMenuClick}
				color="inherit"
			>
				{/* <div className="mx-4 hidden flex-col items-end md:flex">
					<Typography
						component="span"
						className="flex font-semibold"
					>
						{user.data.displayName}
					</Typography>
					<Typography
						className="text-11 font-medium capitalize"
						color="text.secondary"
					>
						{user.role?.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
					</Typography>
				</div> */}

				{/* {user.data.photoURL ? (
					<Avatar
						sx={{
							background: (theme) => theme.palette.background.default,
							color: (theme) => theme.palette.text.secondary
						}}
						className="md:mx-4"
						alt="user photo"
						src={user.data.photoURL}
					/>
				) : (
					<Avatar
						sx={{
							background: (theme) => darken(theme.palette.background.default, 0.05),
							color: (theme) => theme.palette.text.secondary
						}}
						className="md:mx-4"
					>
						{user?.data?.displayName?.[0]}
					</Avatar>
				)} */}
                <FuseSvgIcon className="text-48" size={24} color="action">heroicons-outline:shopping-bag</FuseSvgIcon>
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem
							component={Link}
							to="/sign-in"
							role="button"
						>
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign In" />
						</MenuItem>
						<MenuItem
							component={Link}
							to="/sign-up"
							role="button"
						>
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign up" />
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem
							onClick={() => {
								Navigate('apps/pos/membership');
							}}
						>
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>material-outline:receipt_long</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Membership" />
						</MenuItem>
						<MenuItem
							onClick={() => {
								Navigate('apps/pos/personaltrainer');
							}}
						>
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:user</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Personal Trainer" />
						</MenuItem>
						<MenuItem
							onClick={() => {
								Navigate('apps/pos/products');
							}}
						>
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:shopping-cart</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Products" />
						</MenuItem>
						<MenuItem
							onClick={() => {
								Navigate('apps/pos/bodyanalysis');
							}}
						>
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:scale</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Body Analysis" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default POSMenu;