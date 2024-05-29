import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import AnalyticsDashboardAppHeader from './AnalyticsDashboardAppHeader';
import RevenueHistoryWidget from './widgets/RevenueHistoryWidget';
import MembershipWidget from './widgets/MembershipWidget';
import PersonalTrainerWidget from './widgets/PersonalTrainerWidget';
import ConversionsWidget from './widgets/ConversionsWidget';
import ImpressionsWidget from './widgets/ImpressionsWidget';
import VisitsWidget from './widgets/VisitsWidget';
import MembershipVsMembershipTimeWidget from './widgets/MembershipVsMembershipTimeWidget';
import InquiryWidget from './widgets/InquiryWidget';
import AppUsersWidget from './widgets/AppUsersWidget';
import MonthResultsWidget from './widgets/MonthResultsWidget';
import MembersWidget from './widgets/MembersWidget';
import MembershipExpiredWidget from './widgets/MembershipExpiredWidget';
import ConsultantsSalesWidget from './widgets/ConsultantsSalesWidget';
import MemberAgeGroupWidget from './widgets/MemberAgeGroupWidget';
import PaymentsEfficiencyWidget from './widgets/PaymentsEfficiencyWidget';
import { useGetAnalyticsDashboardWidgetsQuery } from './AnalyticsDashboardApi';

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

/**
 * The analytics dashboard app.
 */
function AnalyticsDashboardApp() {
	const { isLoading } = useGetAnalyticsDashboardWidgetsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			header={<AnalyticsDashboardAppHeader />}
			content={
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-3"
					>
						<RevenueHistoryWidget />
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-3"
					>
						<MembershipWidget />
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-3"
					>
						<PersonalTrainerWidget />
					</motion.div>

					{/* <motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-1 "
					>
						<ConversionsWidget />
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-1 "
					>
						<ImpressionsWidget />
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-1 "
					>
						<VisitsWidget />
					</motion.div> */}

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-3"
					>
						<MembershipVsMembershipTimeWidget />
					</motion.div>

					{/* <div className="w-full mt-16 sm:col-span-3">
						<Typography className="text-2xl font-semibold tracking-tight leading-6">
							Your Audience
						</Typography>
						<Typography
							className="font-medium tracking-tight"
							color="text.secondary"
						>
							Demographic properties of your users
						</Typography>
					</div> */}

					<div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">
						<motion.div variants={item}>
							<InquiryWidget />
						</motion.div>
						<motion.div variants={item}>
							<MembersWidget />
						</motion.div>
						<motion.div variants={item}>
							<AppUsersWidget />
						</motion.div>
						<motion.div variants={item}>
							<MonthResultsWidget />
						</motion.div>
						<motion.div variants={item}>
							<MembershipExpiredWidget />
						</motion.div>
						<motion.div variants={item}>
							<ConsultantsSalesWidget />
						</motion.div>
						<motion.div variants={item}>
							<MemberAgeGroupWidget />
						</motion.div>
						<motion.div variants={item}>
							<PaymentsEfficiencyWidget />
						</motion.div>
					</div>
				</motion.div>
			}
		/>
	);
}

export default AnalyticsDashboardApp;
