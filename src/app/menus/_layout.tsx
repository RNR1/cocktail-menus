import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';

const MenusLayout = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data } = useQuery({
		queryKey: ['menus', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('menu-items')
				.select('menu ( name ), item( id, name )')
				.eq('menu', Number(id));

			if (error) throw error;
			return data;
		},
    select: data => data.at(0),
    staleTime: 1000 * 60 * 5, // 5 minutes
	});
	return <Stack screenOptions={{ headerTitle: data?.menu?.name ?? id }} />;
};

export default MenusLayout;
