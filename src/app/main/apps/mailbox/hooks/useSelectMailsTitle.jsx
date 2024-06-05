import { useMemo } from 'react';
import _ from '@lodash';
import { useGetMailboxFiltersQuery, useGetMailboxFoldersQuery, useGetMailboxLabelsQuery } from '../MailboxApi';

function useSelectMailsTitle(routeParams) {
	const { data: folders } = useGetMailboxFoldersQuery();
	const { data: labels } = useGetMailboxLabelsQuery();
	const { data: filters } = useGetMailboxFiltersQuery();
	const title = useMemo(() => {
		let _title = '';

		if (routeParams.folderHandle) {
			_title = _.find(folders, { slug: routeParams.folderHandle })?.title;
		}

		if (routeParams.labelHandle) {
			_title = _.find(labels, { slug: routeParams.labelHandle })?.title;
		}

		if (routeParams.filterHandle) {
			_title = _.find(filters, { slug: routeParams.filterHandle })?.title;
		}

		return _title;
	}, [folders, labels, filters, routeParams]);
	return title;
}

export default useSelectMailsTitle;
