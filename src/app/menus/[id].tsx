import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuScreen = () => {
	const { id } = useLocalSearchParams();
	const { data, error, isSuccess } = useQuery({
		queryKey: ['menus', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('menu-items')
				.select('menu ( name ), item( id, name )')
				.eq('menu', Number(id));

			if (error) throw error;
			return data;
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View>
					<FlatList
						data={data ?? []}
						keyExtractor={({ item }) => item.id.toString()}
						renderItem={({ item }) => {

							return (
								<View style={styles.itemContainer}>
									<Text>{item.item.name}</Text>
								</View>
							);
						}}
					/>
				</View>
			</SafeAreaView>
		</ThemedView>
	);
};

export default MenuScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row'
	},
	safeArea: {
		flex: 1,
		paddingHorizontal: Spacing.four,
		justifyContent: 'center',
		gap: Spacing.three,
		paddingBottom: BottomTabInset + Spacing.three,
		maxWidth: MaxContentWidth
	},
	itemContainer: {
		paddingVertical: Spacing.two,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
});
