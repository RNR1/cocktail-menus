import { supabase } from '@/lib/supabase';
import { Button, Host, Spacer } from '@expo/ui';
import {
	Form,
	HStack,
	Picker,
	Section,
	Text,
	TextField
} from '@expo/ui/swift-ui';
import { disabled, padding, tag } from '@expo/ui/swift-ui/modifiers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Label, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const NewOrderPage = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [name, setName] = useState('');
	const [cocktail, setCocktail] = useState<number>(1);

	const { data, isSuccess } = useQuery({
		queryKey: ['menu-items'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('menu-items')
				.select('id, menu ( name ), item( name )')
				.eq('menu', 1);

			if (error) {
				console.log(error.message);
				throw error;
			}
			return data;
		}
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			if (!name) return alert('Name is required');
			const { data: order, error: orderError } = await supabase
				.from('orders')
				.insert({ menu: 1, customer: name })
				.select()
				.single();
			if (orderError) throw orderError;
			const { error: itemError } = await supabase
				.from('order-items')
				.insert({ order: order.id, item: cocktail });
			if (itemError) throw itemError;
			return order;
		},
		onSuccess: () => {
			router.back();
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		}
	});

	return (
		<Host
			// matchContents
			style={{
				flex: 1
			}}>
			<Form>
				<Section
					footer={
						<HStack>
							<Spacer />
							<Button
								modifiers={[padding({ top: 12 }), disabled(!name || !cocktail)]}
								onPress={mutate}
								label={isPending ? 'Submitting...' : 'Submit Order'}
							/>
						</HStack>
					}>
					<TextField placeholder='Name' onTextChange={setName} />
					{isSuccess ? (
						<>
							<Label>Choose a cocktail</Label>
							<Picker
								label='Cocktail'
								selection={cocktail}
								onSelectionChange={setCocktail}>
								{data?.map(({ id, item }) => (
									<Text key={id} modifiers={[tag(id)]}>
										{item.name}
									</Text>
								))}
							</Picker>
						</>
					) : null}
				</Section>
			</Form>
		</Host>
	);
};

export default NewOrderPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
