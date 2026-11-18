import { NativeTabs } from 'expo-router/native-tabs';

const AppTabs = () => {
	return (
		<NativeTabs>
			<NativeTabs.Trigger name='menus'>
				<NativeTabs.Trigger.Label>Menus</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf='wineglass.fill' />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='orders'>
				<NativeTabs.Trigger.Label>Orders</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf='receipt.fill' />
			</NativeTabs.Trigger>
		</NativeTabs>
	);
};

export default AppTabs;
