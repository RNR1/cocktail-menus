import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase.types';
import { Button, Section, SwipeActions, Text } from '@expo/ui/swift-ui';
import { tint } from '@expo/ui/swift-ui/modifiers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type OrderItemProps = {
	id: number;
	customer: string;
	cocktail: string;
};

const mutationFn = async ({
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
};

const OrderItem = ({ id, customer, cocktail }: OrderItemProps) => {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		}
	});

	return (
		<Section key={id} title={customer}>
			<SwipeActions>
				<Text>{cocktail}</Text>

				<SwipeActions.Actions edge='leading' allowsFullSwipe>
					<Button
						label='Cancel'
						systemImage='xmark'
						role='destructive'
						onPress={() => mutate({ id, status: 'Cancelled' })}
					/>
				</SwipeActions.Actions>

				<SwipeActions.Actions edge='trailing' allowsFullSwipe>
					<Button
						label='Complete'
						systemImage='checkmark'
						role='destructive'
						modifiers={[tint('#4CAF50')]}
						onPress={() => mutate({ id, status: 'Completed' })}
					/>
				</SwipeActions.Actions>
			</SwipeActions>
		</Section>
	);
};

export default OrderItem;
