import createOrderMutation from '@/mutations/createOrderMutation';
import menuByIdQuery from '@/queries/menuById';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { Label, useRouter } from 'expo-router';
import { useState } from 'react';

const NewOrderPage = () => {
	const router = useRouter();

	const [name, setName] = useState('');
	const [cocktail, setCocktail] = useState<number>(1);

	const { data, isSuccess } = useQuery(menuByIdQuery(1));

	const { mutate, isPending } = useMutation(createOrderMutation);

	return (
		<Host
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
								onPress={() =>
									mutate(
										{ name, item: cocktail },
										{ onSuccess: () => router.back() }
									)
								}
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
								{data?.items.map(({ id, cocktail }) => (
									<Text key={id} modifiers={[tag(id)]}>
										{cocktail.name}
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
