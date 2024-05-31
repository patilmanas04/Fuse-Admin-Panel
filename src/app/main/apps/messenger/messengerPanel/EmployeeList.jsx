import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { memo, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import clsx from 'clsx';
import { Box, CircularProgress } from '@mui/material';
import { selectSelectedEmployeeId, setSelectedEmployeeId, openChatPanel } from './messengerPanelSlice';
import EmployeeButton from './EmployeeButton';
import { useGetMessengerChatsQuery, useGetMessengerEmployeesQuery } from '../MessengerApi';

const Root = styled(FuseScrollbars)(({ theme }) => ({
	background: theme.palette.background.paper
}));
const container = {
	show: {
		transition: {
			staggerChildren: 0.025
		}
	}
};
const item = {
	hidden: { opacity: 0, scale: 0.6 },
	show: { opacity: 1, scale: 1 }
};

/**
 * The employee list.
 */
function EmployeeList(props) {
	const { className } = props;
	const dispatch = useAppDispatch();
	const selectedEmployeeId = useAppSelector(selectSelectedEmployeeId);
	const employeeListScroll = useRef(null);
	const { data: chats, isLoading: isChatsLoading } = useGetMessengerChatsQuery();
	const { data: employees, isLoading: isEmployeesLoading } = useGetMessengerEmployeesQuery();
	const chatListEmployees = useMemo(() => {
		return employees?.length > 0 && chats?.length > 0
			? chats.map((_chat) => ({
					..._chat,
					...employees.find((_employee) => _employee.id === _chat.employeeId)
				}))
			: [];
	}, [employees, chats]);
	const scrollToTop = () => {
		if (!employeeListScroll.current) {
			return;
		}

		employeeListScroll.current.scrollTop = 0;
	};
	const handleEmployeeClick = (employeeId) => {
		dispatch(openChatPanel());
		dispatch(setSelectedEmployeeId(employeeId));
		scrollToTop();
	};

	if (isEmployeesLoading || isChatsLoading) {
		return (
			<Box
				className="flex justify-center py-12"
				sx={{
					width: 70,
					minWidth: 70
				}}
			>
				<CircularProgress color="secondary" />
			</Box>
		);
	}

	return (
		<Root
			className={clsx('flex shrink-0 flex-col overflow-y-auto py-8 overscroll-contain', className)}
			ref={employeeListScroll}
			option={{ suppressScrollX: true, wheelPropagation: false }}
		>
			{employees?.length > 0 && (
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="flex flex-col shrink-0"
				>
					{chatListEmployees &&
						chatListEmployees.map((employee) => {
							return (
								<motion.div
									variants={item}
									key={employee.id}
								>
									<EmployeeButton
										employee={employee}
										selectedEmployeeId={selectedEmployeeId}
										onClick={handleEmployeeClick}
									/>
								</motion.div>
							);
						})}
					<Divider className="mx-24 my-8" />
					{employees.map((employee) => {
						const chatEmployee = chats.find((_chat) => _chat.employeeId === employee.id);
						return !chatEmployee ? (
							<motion.div
								variants={item}
								key={employee.id}
							>
								<EmployeeButton
									employee={employee}
									selectedEmployeeId={selectedEmployeeId}
									onClick={handleEmployeeClick}
								/>
							</motion.div>
						) : null;
					})}
				</motion.div>
			)}
		</Root>
	);
}

export default memo(EmployeeList);
