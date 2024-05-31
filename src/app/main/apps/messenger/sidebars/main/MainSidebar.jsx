import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useMemo, useState } from 'react';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { lighten } from '@mui/material/styles';
import EmployeeListItem from './EmployeeListItem';
import UserAvatar from '../../UserAvatar';
import MainSidebarMoreMenu from './MainSidebarMoreMenu';
import { ChatAppContext } from '../../MessengerApp';
import ChatListItem from './ChatListItem';
import {
	useGetMessengerChatsQuery,
	useGetMessengerEmployeesQuery,
	useGetMessengerUserProfileQuery
} from '../../MessengerApi';

/**
 * The main sidebar.
 */
function MainSidebar() {
	const { setUserSidebarOpen } = useContext(ChatAppContext);
	const { data: employees } = useGetMessengerEmployeesQuery();
	const { data: user } = useGetMessengerUserProfileQuery();
	const { data: chats } = useGetMessengerChatsQuery();
	const [searchText, setSearchText] = useState('');

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	return (
		<div className="flex flex-col flex-auto h-full">
			<Box
				className="py-16 px-32 border-b-1"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? lighten(theme.palette.background.default, 0.4)
							: lighten(theme.palette.background.default, 0.02)
				}}
			>
				<div className="flex justify-between items-center mb-16">
					{user && (
						<div
							className="flex items-center cursor-pointer"
							onClick={() => setUserSidebarOpen(true)}
							onKeyDown={() => setUserSidebarOpen(true)}
							role="button"
							tabIndex={0}
						>
							<UserAvatar
								className="relative"
								user={user}
							/>
							<Typography className="mx-16 font-medium">{user?.name}</Typography>
						</div>
					)}

					<MainSidebarMoreMenu className="-mx-16" />
				</div>

				{useMemo(
					() => (
						<Paper className="flex p-4 items-center w-full px-16 py-4 border-1 h-40 rounded-full shadow-none">
							<FuseSvgIcon
								color="action"
								size={20}
							>
								heroicons-solid:search
							</FuseSvgIcon>

							<Input
								placeholder="Search or start new chat"
								className="flex flex-1 px-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={handleSearchText}
							/>
						</Paper>
					),
					[searchText]
				)}
			</Box>

			<FuseScrollbars className="flex-1">
				<List className="w-full">
					{useMemo(() => {
						if (!employees || !chats) {
							return null;
						}

						function getFilteredArray(arr, _searchText) {
							if (_searchText.length === 0) {
								return arr;
							}

							return FuseUtils.filterArrayByString(arr, _searchText);
						}

						const chatListEmployees =
							employees?.length > 0 && chats?.length > 0
								? chats.map((_chat) => ({
										..._chat,
										...employees.find((_employee) => _employee.id === _chat.employeeId)
									}))
								: [];
						const filteredEmployees = getFilteredArray([...employees], searchText);
						const filteredChatList = getFilteredArray([...chatListEmployees], searchText);
						const container = {
							show: {
								transition: {
									staggerChildren: 0.02
								}
							}
						};
						const item = {
							hidden: { opacity: 0, y: 10 },
							show: { opacity: 1, y: 0 }
						};
						return (
							<motion.div
								className="flex flex-col shrink-0"
								variants={container}
								initial="hidden"
								animate="show"
							>
								{filteredChatList.length > 0 && (
									<motion.div variants={item}>
										<Typography
											className="font-medium text-20 px-32 py-24"
											color="secondary.main"
										>
											Chats
										</Typography>
									</motion.div>
								)}

								{filteredChatList.map((chat, index) => (
									<motion.div
										variants={item}
										key={chat.id}
									>
										<div className={clsx(filteredChatList.length !== index + 1 && 'border-b-1')}>
											<ChatListItem item={chat} />
										</div>
									</motion.div>
								))}

								{filteredEmployees.length > 0 && (
									<motion.div variants={item}>
										<Typography
											className="font-medium text-20 px-32 py-24"
											color="secondary.main"
										>
											Employees
										</Typography>
									</motion.div>
								)}

								{filteredEmployees.map((employee, index) => (
									<motion.div
										variants={item}
										key={employee.id}
									>
										<div className={clsx(filteredEmployees.length !== index + 1 && 'border-b-1')}>
											<EmployeeListItem item={employee} />
										</div>
									</motion.div>
								))}
							</motion.div>
						);
					}, [employees, chats, searchText])}
				</List>
			</FuseScrollbars>
		</div>
	);
}

export default MainSidebar;
