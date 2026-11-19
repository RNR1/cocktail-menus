import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase.types';
import { queryOptions } from '@tanstack/react-query';

const orderCountQuery = (status: Database['public']['Enums']['OrderStatus']) =>
	queryOptions({
		queryKey: ['order-count', status],
		queryFn: async () => {
			const { error, count } = await supabase
				.from('orders')
				.select('*', { count: 'exact', head: true})
				.eq('status', status);
			if (error) throw error;
			return count;
		}
	});

  export default orderCountQuery;
