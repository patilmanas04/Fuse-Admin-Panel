import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useNavigate, useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import _ from '@lodash';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { useAppDispatch } from 'app/store/hooks';
import { useGetClientsItemQuery, useGetClientsCountriesQuery, useGetClientsTagsQuery } from '../ClientsApi';

/**
 * The client view.
 */
function ClientView() {
	const { data: countries } = useGetClientsCountriesQuery();
	const { data: tags } = useGetClientsTagsQuery();
	const routeParams = useParams();
	const { id: clientId } = routeParams;
	const {
		data: client,
		isLoading,
		isError
	} = useGetClientsItemQuery(clientId, {
		skip: !clientId
	});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function getCountryByIso(iso) {
		return countries?.find((country) => country.iso === iso);
	}

	if (isLoading) {
		return <FuseLoading className="min-h-screen" />;
	}

	if (isError) {
		setTimeout(() => {
			navigate('/apps/clients');
			dispatch(showMessage({ message: 'NOT FOUND' }));
		}, 0);
		return null;
	}

	if (!client) {
		return null;
	}

	return (
		<>
			<Box
				className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
				sx={{
					backgroundColor: 'background.default'
				}}
			>
				{client.background && (
					<img
						className="absolute inset-0 object-cover w-full h-full"
						src={client.background}
						alt="user background"
					/>
				)}
			</Box>
			<div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
				<div className="w-full max-w-3xl">
					<div className="flex flex-auto items-end -mt-64">
						<Avatar
							sx={{
								borderWidth: 4,
								borderStyle: 'solid',
								borderColor: 'background.paper',
								backgroundColor: 'background.default',
								color: 'text.secondary'
							}}
							className="w-128 h-128 text-64 font-bold"
							src={client.avatar}
							alt={client.name}
						>
							{client?.name?.charAt(0)}
						</Avatar>
						<div className="flex items-center ml-auto mb-4">
							<Button
								variant="contained"
								color="secondary"
								component={NavLinkAdapter}
								to="edit"
							>
								<FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
								<span className="mx-8">Edit</span>
							</Button>
						</div>
					</div>

					<Typography className="mt-12 text-4xl font-bold truncate">{client.name}</Typography>

					<div className="flex flex-wrap items-center mt-8">
						{client?.tags?.map((id) => (
							<Chip
								key={id}
								label={_.find(tags, { id })?.title}
								className="mr-12 mb-12"
								size="small"
							/>
						))}
					</div>

					<Divider className="mt-16 mb-24" />

					<div className="flex flex-col space-y-32">
						{client.title && (
							<div className="flex items-center">
								<FuseSvgIcon>heroicons-outline:briefcase</FuseSvgIcon>
								<div className="ml-24 leading-6">{client.title}</div>
							</div>
						)}

						{client.company && (
							<div className="flex items-center">
								<FuseSvgIcon>heroicons-outline:office-building</FuseSvgIcon>
								<div className="ml-24 leading-6">{client.company}</div>
							</div>
						)}

						{client?.emails?.length && client.emails.some((item) => item.email?.length > 0) && (
							<div className="flex">
								<FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
								<div className="min-w-0 ml-24 space-y-4">
									{client.emails.map(
										(item) =>
											item.email !== '' && (
												<div
													className="flex items-center leading-6"
													key={item.email}
												>
													<a
														className="hover:underline text-primary-500"
														href={`mailto: ${item.email}`}
														target="_blank"
														rel="noreferrer"
													>
														{item.email}
													</a>
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
											)
									)}
								</div>
							</div>
						)}

						{client?.phoneNumbers &&
							client?.phoneNumbers?.length &&
							client.phoneNumbers.some((item) => item.phoneNumber?.length > 0) && (
								<div className="flex">
									<FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
									<div className="min-w-0 ml-24 space-y-4">
										{client.phoneNumbers.map(
											(item, index) =>
												item.phoneNumber !== '' && (
													<div
														className="flex items-center leading-6"
														key={index}
													>
														<Box
															className="hidden sm:flex w-24 h-16 overflow-hidden"
															sx={{
																background:
																	"url('/assets/images/apps/clients/flags.png') no-repeat 0 0",
																backgroundSize: '24px 3876px',
																backgroundPosition: getCountryByIso(item.country)
																	?.flagImagePos
															}}
														/>

														<div className="sm:ml-12 font-mono">
															{getCountryByIso(item.country)?.code}
														</div>

														<div className="ml-10 font-mono">{item.phoneNumber}</div>

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
												)
										)}
									</div>
								</div>
							)}

						{client.address && (
							<div className="flex items-center">
								<FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
								<div className="ml-24 leading-6">{client.address}</div>
							</div>
						)}

						{client.birthday && (
							<div className="flex items-center">
								<FuseSvgIcon>heroicons-outline:cake</FuseSvgIcon>
								<div className="ml-24 leading-6">{format(new Date(client.birthday), 'MMMM d, y')}</div>
							</div>
						)}

						{client.notes && (
							<div className="flex">
								<FuseSvgIcon>heroicons-outline:menu-alt-2</FuseSvgIcon>
								<div
									className="max-w-none ml-24 prose dark:prose-invert"
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{ __html: client.notes }}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default ClientView;
