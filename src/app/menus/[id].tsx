import { supabase } from '@/lib/supabase';
import { Host, List, Section } from '@expo/ui/swift-ui';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

const MenuScreen = () => {
	const { id } = useLocalSearchParams();
	const { data } = useQuery({
		queryKey: ['menus', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('menus')
				.select(
					`
					name,
					items:"menu-items" (
						id,
						cocktail:item (
							name
						)
					)`
				)
				.eq('id', Number(id))
				.single();

			if (error) throw error;
			return data;
		},
		staleTime: 1000 * 60 * 5 // 5 minutes
	});

	return (
		<Host style={styles.container}>
			<Section title={data?.name}>
				<List>
					{data?.items?.map(item => (
						<Text key={item.id}>{item.cocktail.name}</Text>
					))}
				</List>
			</Section>
		</Host>
	);
};

export default MenuScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
