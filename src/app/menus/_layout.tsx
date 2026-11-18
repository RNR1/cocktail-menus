import { Stack } from 'expo-router';

const MenusLayout = () => (
	<Stack>
		<Stack.Screen
			name='index'
			options={{
				title: 'Menus',
				headerBackButtonDisplayMode: 'minimal',
				headerBackTitle: 'Menus'
			}}
		/>
		<Stack.Screen name='[id]' options={{ title: '' }} />
	</Stack>
);

export default MenusLayout;
