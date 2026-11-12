import { Link } from 'expo-router';
import { Button, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';


export default function MenusScreen() {
  const { data , error, isSuccess} = useQuery({
		queryKey: ['menus'],
		queryFn: async () => {
			const { data, error } = await supabase.from('menus').select('*');
			if (error) throw error;
			return data;
		},
	});


  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title">🍸</ThemedText>
          <ThemedText type="title" style={styles.title}>
            Cocktail Menus
          </ThemedText>
        </ThemedView>


          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Link href={{ pathname: `/menus/[id]`, params: { id: item.id } }} asChild><Button title={item.name} /></Link>
            )}
          />


      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
