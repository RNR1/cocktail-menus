import { supabase } from '@/lib/supabase';
import orderCountQuery from '@/queries/orderCount';
import ordersQuery from '@/queries/orders';
import queryClient from '@/queries/queryClient';
import { Database } from '@/types/supabase.types';
import { mutationOptions } from '@tanstack/react-query';

const updateOrderStatusMutation = mutationOptions({
	mutationFn: async ({
		id,
		status
	}: {
		id: number;
		status: Database['public']['Enums']['OrderStatus'];
	}) => {
		const { data, error } = await supabase
			.from('orders')
			.update({ status })
			.eq('id', id);
		if (error) throw error;
		return data;
	},
	onSuccess: (_, { status }) => {
		queryClient.invalidateQueries(ordersQuery);
		if (status === 'Completed') {
			queryClient.invalidateQueries(orderCountQuery('Completed'))
		}
	}
});

export default updateOrderStatusMutation;
