import { motion } from 'framer-motion';
import RecentlyRegisteredUserWidget from './widgets/RecentlyRegisteredUserWidget';

/**
 * The RecentlyRegisteredUsersTab component.
 */
function RecentlyRegisteredUsersTab() {
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
	return (
		<motion.div
			className="flex flex-wrap p-24"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div
				variants={item}
				className="widget flex w-full"
			>
				<RecentlyRegisteredUserWidget />
			</motion.div>
		</motion.div>
	);
}

export default RecentlyRegisteredUsersTab;
