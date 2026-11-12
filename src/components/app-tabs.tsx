import { NativeTabs } from 'expo-router/native-tabs';


export default function AppTabs() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="menus">
        <NativeTabs.Trigger.Label>Menus</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>Orders</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
