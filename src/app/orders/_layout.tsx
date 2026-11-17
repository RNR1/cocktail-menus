import { Stack } from 'expo-router';

const OrdersLayout = () => {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ title: 'Orders' }} />
			<Stack.Screen
				name='new'
				options={{
					title: 'New Order',
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default OrdersLayout;
