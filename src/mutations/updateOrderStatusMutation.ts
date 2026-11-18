import { supabase } from '@/lib/supabase';
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
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ordersQuery.queryKey });
	}
});

export default updateOrderStatusMutation;
