import { supabase } from '@/lib/supabase';
import {
	Button,
	Column,
	Host,
	Picker,
	Row,
	Spacer,
	Text,
	TextInput,
	TextInputRef
} from '@expo/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

const NewOrderPage = () => {
	const inputRef = useRef<TextInputRef>(null);

	const [name, setName] = useState('');
	const [cocktail, setCocktail] = useState<number>(0);

	const { data } = useQuery({
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

	const { mutate } = useMutation({
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
		}
	});

	return (
		<Host matchContents style={styles.container}>
			<Column alignment='center' style={{ padding: 16 }}>
				<Row alignment='center' spacing={12} style={{ padding: 16 }}>
					<Text>Name:</Text>
					<Spacer flexible />
					<TextInput ref={inputRef} placeholder='Name' onChangeText={setName} />
				</Row>
				<Spacer />
				<Row alignment='center' spacing={6} style={{ padding: 16 }}>
					<Text>Item:</Text>
					<Spacer flexible />
					<Picker selectedValue={cocktail} onValueChange={setCocktail}>
						{data?.map(({ id, item }) => (
							<Picker.Item key={id} label={item.name} value={id} />
						))}
					</Picker>
				</Row>
				<Row>
					<Button onPress={mutate} label='Click' />
				</Row>
			</Column>
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
