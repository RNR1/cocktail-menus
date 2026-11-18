import OrderItem from '@/components/OrderItem';
import ordersQuery from '@/queries/orders';
import { Button, Host, HStack, List, Spacer, VStack } from '@expo/ui/swift-ui';
import {
	buttonBorderShape,
	buttonStyle,
	controlSize,
	frame,
	labelStyle,
	padding
} from '@expo/ui/swift-ui/modifiers';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

const Orders = () => {
	const router = useRouter();

	const { data } = useQuery(ordersQuery);

	return (
		<Host style={styles.host}>
			<VStack spacing={12}>
				<HStack>
					<Spacer />
					<Button
						label='New Order'
						systemImage='plus'
						modifiers={[
							padding({ trailing: 32 }),
							buttonStyle('glass'),
							controlSize('extraLarge'),
							labelStyle('iconOnly'),
							buttonBorderShape('circle')
						]}
						onPress={() => router.push('/orders/new')}
					/>
				</HStack>
				{data?.length ? (
					<VStack>
						<List modifiers={[frame({ maxWidth: 600 })]}>
							{data?.map(order => (
								<OrderItem
									key={order.id}
									id={order.id}
									customer={order.customer}
									cocktail={order.items.at(0)?.menu_item.cocktail.name ?? ''}
								/>
							))}
						</List>
					</VStack>
				) : null}
			</VStack>
		</Host>
	);
};

export default Orders;

const styles = StyleSheet.create({
	host: {
		flex: 1
	}
});
