import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import FuseNavigation from '@fuse/core/FuseNavigation';
import FuseNavItemModel from '@fuse/core/FuseNavigation/models/FuseNavItemModel';
import MailCompose from './MailCompose';
import { useGetMailboxFiltersQuery, useGetMailboxFoldersQuery, useGetMailboxLabelsQuery } from './MailboxApi';

/**
 * The mailbox app sidebar content.
 */
function MailboxAppSidebarContent() {
	// const { data: folders } = useGetMailboxFoldersQuery();
	const folders = [
		{
		  "id": "7c004a19-4506-48ef-93ab-f16381302e3b",
		  "title": "Members Reports",
		  "slug": "members-reports",
		  "icon": "heroicons-outline:document-text"
		},
		{
		  "id": "1ee2ea29-9a1f-4c27-b4d2-5e465703b6a0",
		  "title": "Payments Reports",
		  "slug": "payments-reports",
		  "icon": "heroicons-outline:credit-card"
		},
		{
		  "id": "fbdc8e79-a0c4-4a27-bc98-9c81ee7a86e5",
		  "title": "CRM Reports",
		  "slug": "crm-reports",
		  "icon": "heroicons-outline:user-group"
		},
		{
		  "id": "0197c436-2ef3-424d-b546-8b7f49186e15",
		  "title": "Attendance Reports",
		  "slug": "attendance-reports",
		  "icon": "heroicons-outline:calendar"
		}
	]
	const { data: labels } = useGetMailboxLabelsQuery();
	const { data: filters } = useGetMailboxFiltersQuery();
	const { t } = useTranslation('mailboxApp');
	return (
		<div className="flex-auto border-l-1">
			<div className="mb-24 mt-40 mx-24">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
				>
					<Typography className="text-4xl font-extrabold tracking-tight leading-none">Reports Tab</Typography>
				</motion.div>
			</div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
			>

				<FuseNavigation
					navigation={folders?.map((item) => ({
						...item,
						type: 'item',
						url: `/apps/mailbox/${item.slug}`
					}))}
				/>
			</motion.div>

			{/* <motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-12 font-600"
					color="secondary.main"
				>
					{t('FILTERS')}
				</Typography>

				<FuseNavigation
					navigation={filters?.map((item) => ({
						...item,
						type: 'item',
						url: `/apps/mailbox/filter/${item.slug}`
					}))}
				/>
			</motion.div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-12 font-600"
					color="secondary.main"
				>
					{t('LABELS')}
				</Typography>

				<FuseNavigation
					navigation={labels?.map((item) =>
						FuseNavItemModel({
							...item,
							type: 'item',
							url: `/apps/mailbox/label/${item.slug}`,
							icon: 'heroicons-outline:tag',
							sx: {
								'& > .fuse-list-item-icon': {
									color: `${item.color}!important`,
									opacity: 0.6
								}
							}
						})
					)}
				/>
			</motion.div> */}
		</div>
	);
}

export default MailboxAppSidebarContent;
