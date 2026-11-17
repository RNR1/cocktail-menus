import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Orders = () => {
	const { data, isSuccess } = useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('order-items')
				.select('id, order ( customer ), item ( item ( name ) )');
			if (error) throw error;
			return data;
		}
	});

	return (
		<SafeAreaView style={styles.host}>
			<Link href='/orders/new' asChild>
				<Button title='New Order' />
			</Link>

			{isSuccess ? (
				<FlatList
					data={data}
					renderItem={item => (
						<View>
							<Text>{item.item.order.customer}</Text>
							<Text>{item.item.item.item.name}</Text>
						</View>
					)}
				/>
			) : null}
		</SafeAreaView>
	);
};

export default Orders;

const styles = StyleSheet.create({
	host: {
		flex: 1,
		justifyContent: 'center'
	}
});
