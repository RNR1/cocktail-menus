import { supabase } from '@/lib/supabase';
import ordersQuery from '@/queries/orders';
import queryClient from '@/queries/queryClient';
import { mutationOptions } from '@tanstack/react-query';

type CreateOrderMutationValues = {
	name: string;
	item: number;
};

const createOrderMutation = mutationOptions({
	mutationFn: async ({ name, item }: CreateOrderMutationValues) => {
		if (!name) return alert('Name is required');
		const { data: order, error: orderError } = await supabase
			.from('orders')
			.insert({ menu: 1, customer: name })
			.select()
			.single();
		if (orderError) throw orderError;

		const { error: itemError } = await supabase
			.from('order-items')
			.insert({ order: order.id, item });
		if (itemError) throw itemError;
		return order;
	},
	onSuccess: () =>
		queryClient.invalidateQueries(ordersQuery)
});

export default createOrderMutation;
