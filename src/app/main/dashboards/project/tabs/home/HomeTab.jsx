import { motion } from 'framer-motion';
import SummaryWidget from './widgets/SummaryWidget';
import UpcomingAppointmentsWidget from './widgets/UpcomingAppointmentsWidget';
import UpcomingFollowupWidget from './widgets/UpcomingFollowupWidget';
import UpcomingBirthdayWidget from './widgets/UpcomingBirthdayWidget';
import RecentCollections from './widgets/RecentCollections';
import RecentlyExpiredMembersip from './widgets/RecentlyExpiredMembersip';
import UpcomingPaymentDueWidget from './widgets/UpcomingPaymentDueWidget';
import UpcomingMembershipExpiresWidget from './widgets/UpcomingMembershipExpiresWidget';
import TodayClassesWidget from './widgets/TodayClassesWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import TaskDistributionWidget from './widgets/TaskDistributionWidget';
import ScheduleWidget from './widgets/ScheduleWidget';
import { useState } from 'react';

/**
 * The HomeTab component.
 */
function HomeTab() {
	const [graph, setGraph] = useState(0)

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	const handleClick = (value) => {
		setGraph(value)
	}

	return (
		<motion.div
			className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={item}>
				<UpcomingAppointmentsWidget />
			</motion.div>
			<motion.div variants={item}>
				<UpcomingFollowupWidget />
			</motion.div>
			<motion.div variants={item}>
				<UpcomingBirthdayWidget />
			</motion.div>
			<motion.div variants={item}>
				<RecentCollections />
			</motion.div>
			<motion.div variants={item}>
				<RecentlyExpiredMembersip />
			</motion.div>
			<motion.div variants={item}>
				<UpcomingPaymentDueWidget />
			</motion.div>
			<motion.div variants={item}>
				<UpcomingMembershipExpiresWidget />
			</motion.div>
			<motion.div variants={item}>
				<TodayClassesWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4"
			>
				<GithubIssuesWidget />
			</motion.div>
			{/* <motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>
				<TaskDistributionWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>
				<ScheduleWidget />
			</motion.div> */}
		</motion.div>
	);
}

export default HomeTab;
