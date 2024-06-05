import FuseUtils from '@fuse/utils';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppSelector } from 'app/store/hooks';
import MailListItem from './MailListItem';
import { selectSearchText } from '../mailboxAppSlice';
import { useGetMailboxMailsQuery } from '../MailboxApi';

/**
 * The mail list.
 */
function MailList() {
	const routeParams = useParams();
	const searchText = useAppSelector(selectSearchText);
	const { data: mails } = useGetMailboxMailsQuery(routeParams);
	const [filteredData, setFilteredData] = useState([]);
	const { t } = useTranslation('mailboxApp');
	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0) {
				return mails;
			}

			return FuseUtils.filterArrayByString(mails, searchText);
		}

		if (mails) {
			setFilteredData([
				{
					route: "membership-report",
					title: "Membership Report",
					description: "Report generates a list of all contract members with their contact and contract data. The report allows you to generate a list of all clients put into the system by the membership status with its start and end date and their financial status."
				},
				{
					route: "due-memberships",
					title: "Due Memberships",
					description: "Report allows you to monitor the members with due membership by current month. The report allows you to generate a list of all clients put into the system with the membership expiring over current month with its start and due date."
				},
				{
					route: "personal-training",
					title: "Personal Training",
					description: "Report generates a list of all PT contract members with their contact, contract data and PT Trainers. The report allows you to generate a list of all clients put into the system by the PT membership status with its start and end date, and their financial status."
				},
				{
					route: "member-measurement",
					title: "Member Measurement",
					description: "Generate a list of club members with information about last measurement done on with body stats entered to the system and next to be done on."
				},
			]);
		}
	}, [mails, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center p-24"
			>
				<FuseSvgIcon
					className="icon-size-128 mb-16"
					color="disabled"
					size={24}
				>
					heroicons-outline:mail-open
				</FuseSvgIcon>
				<Typography
					className="mt-16 text-2xl font-semibold tracking-tight"
					color="text.secondary"
				>
					{t('NO_MESSAGES')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<List className="p-0 w-full">
			{console.log(filteredData)}
			{filteredData.map((mail) => (
				<MailListItem
					mail={mail}
					key={mail.id}
				/>
			))}
		</List>
	);
}

export default withRouter(MailList);
