import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import UserAvatar from '../../UserAvatar';
import { ChatAppContext } from '../../MessengerApp';
import { useGetMessengerEmployeeQuery } from '../../MessengerApi';

/**
 * The employee sidebar.
 */
function EmployeeSidebar() {
	const { setEmployeeSidebarOpen } = useContext(ChatAppContext);
	const routeParams = useParams();
	const employeeId = routeParams.id;
	const { data: employee } = useGetMessengerEmployeeQuery(employeeId, {
		skip: !employeeId
	});

	if (!employee) {
		return null;
	}

	return (
		<div className="flex flex-col flex-auto h-full">
			<Box
				className="border-b-1"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? lighten(theme.palette.background.default, 0.4)
							: lighten(theme.palette.background.default, 0.02)
				}}
			>
				<Toolbar className="flex items-center px-4">
					<IconButton
						onClick={() => setEmployeeSidebarOpen(false)}
						color="inherit"
						size="large"
					>
						<FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
					</IconButton>
					<Typography
						className="px-4 font-medium text-16"
						color="inherit"
						variant="subtitle1"
					>
						Employee info
					</Typography>
				</Toolbar>
			</Box>

			<div className="flex flex-col justify-center items-center mt-32">
				<UserAvatar
					className="w-160 h-160 text-64"
					user={employee}
				/>
				<Typography className="mt-16 text-16 font-medium">{employee.name}</Typography>

				<Typography
					color="text.secondary"
					className="mt-2 text-13"
				>
					{employee.about}
				</Typography>
			</div>
			<div className="w-full p-24">
				{employee.attachments?.media && (
					<>
						<Typography className="mt-16 text-16 font-medium">Media</Typography>
						<div className="grid grid-cols-4 gap-4 mt-16">
							{employee.attachments?.media.map((url, index) => (
								<img
									key={index}
									className="h-80 rounded object-cover"
									src={url}
									alt=""
								/>
							))}
						</div>
					</>
				)}

				<Typography className="mt-40 text-16 font-medium">Details</Typography>

				<div className="mt-16">
					<Typography
						className="text-14 font-medium"
						color="text.secondary"
					>
						Emails
					</Typography>

					{employee.details.emails?.map((item, index) => (
						<div
							className="flex items-center"
							key={index}
						>
							<Typography>{item.email}</Typography>
							{item.label && (
								<Typography
									className="text-md truncate"
									color="text.secondary"
								>
									<span className="mx-8">&bull;</span>
									<span className="font-medium">{item.label}</span>
								</Typography>
							)}
						</div>
					))}
				</div>

				<div className="mt-16">
					<Typography
						className="text-14 font-medium"
						color="text.secondary"
					>
						Phone numbers
					</Typography>

					{employee.details.phoneNumbers?.map((item, index) => (
						<div
							className="flex items-center"
							key={index}
						>
							<Typography>{item.phoneNumber}</Typography>
							{item.label && (
								<Typography
									className="text-md truncate"
									color="text.secondary"
								>
									<span className="mx-8">&bull;</span>
									<span className="font-medium">{item.label}</span>
								</Typography>
							)}
						</div>
					))}
				</div>

				<div className="mt-16">
					<Typography
						className="text-14 font-medium"
						color="text.secondary"
					>
						Title
					</Typography>

					<Typography>{employee.details.title}</Typography>
				</div>

				<div className="mt-16">
					<Typography
						className="text-14 font-medium"
						color="text.secondary"
					>
						Company
					</Typography>

					<Typography>{employee.details.company}</Typography>
				</div>

				<div className="mt-16">
					<Typography
						className="text-14 font-medium"
						color="text.secondary"
					>
						Birthday
					</Typography>

					<Typography>{format(new Date(employee.details.birthday), 'P')}</Typography>
				</div>

				<div className="mt-16">
					<Typography
						className="text-14 font-medium"
						color="text.secondary"
					>
						Address
					</Typography>

					<Typography>{employee.details.address}</Typography>
				</div>
			</div>
		</div>
	);
}

export default EmployeeSidebar;
