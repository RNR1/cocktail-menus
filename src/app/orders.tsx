import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';

const Orders = () => {
	const { data , isSuccess} = useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const { data, error } = await supabase.from('orders').select();
			if (error) throw error;
			return data;
		},
	});

	return (
		<View>
			<Text>Orders</Text>
      {/* {isSuccess ? <FlatList data={data} /> : null} */}
		</View>
	);
};

export default Orders;
