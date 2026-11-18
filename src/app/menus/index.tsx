import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import menusQuery from '@/queries/menus';
import {
	Button,
	Host,
	HStack,
	List,
	Section,
	Spacer,
	Text,
	VStack
} from '@expo/ui/swift-ui';
import { font, frame } from '@expo/ui/swift-ui/modifiers';
import { useQuery } from '@tanstack/react-query';

export default function MenusScreen() {
	const router = useRouter();

	const { data } = useQuery(menusQuery);

	return (
		<Host style={styles.container}>
			<VStack>
				<Spacer />
				<HStack>
					<Spacer />
					<VStack modifiers={[font({ size: 34 })]}>
						<Text>🍸</Text>
						<Text>Cocktail Menus</Text>
					</VStack>
					<Spacer />
				</HStack>

				<List modifiers={[frame({ maxWidth: 600 })]}>
					{data?.map(item => (
						<Section key={item.id}>
							<Button
								label={item.name}
								onPress={() =>
									router.push({
										pathname: `/menus/[id]`,
										params: { id: item.id }
									})
								}
							/>
						</Section>
					))}
				</List>
			</VStack>
		</Host>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row'
	}
});
