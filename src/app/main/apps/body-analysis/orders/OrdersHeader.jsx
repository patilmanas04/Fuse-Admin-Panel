import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';


/**
 * The orders header.
 */
function OrdersHeader() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	return (
		<div className="flex space-y-12 sm:space-y-0 flex-1 w-full items-center justify-between py-8 sm:py-16 px-16 md:px-24">
			<motion.span
				initial={{ x: -20 }}
				animate={{
					x: 0,
					transition: { delay: 0.2 }
				}}
			>
				<Typography className="flex text-24 md:text-32 font-extrabold tracking-tight">Suppliers</Typography>
			</motion.span>

			<div className="flex w-full sm:w-auto flex-1 items-center justify-end space-x-8" />
			<div className="flex flex-1 items-center justify-end space-x-8">
				<motion.div
					className="flex flex-grow-0"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
				>
					<Button
						className=""
						variant="contained"
						color="secondary"
						component={NavLinkAdapter}
						to="/apps/e-commerce/products/new"
						size={isMobile ? 'small' : 'medium'}
					>
						<FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
						<span className="mx-4 sm:mx-8">Add</span>
					</Button>
				</motion.div>
			</div>
		</div>
	);
}

export default OrdersHeader;
