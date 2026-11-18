import menuByIdQuery from '@/queries/menuById';
import { Host, HStack, List, Section, Spacer, VStack } from '@expo/ui/swift-ui';
import { frame } from '@expo/ui/swift-ui/modifiers';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

const MenuScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data } = useQuery(menuByIdQuery(Number(id)));

	return (
		<Host style={styles.container}>
			<VStack>
				<Spacer />
				<HStack>
					<Spacer />
					<List modifiers={[frame({ maxWidth: 600 })]}>
						<Section title={data?.name}>
							{data?.items?.map(item => (
								<Text key={item.id}>🍸 {item.cocktail.name}</Text>
							))}
						</Section>
					</List>
					<Spacer />
				</HStack>
			</VStack>
		</Host>
	);
};

export default MenuScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
