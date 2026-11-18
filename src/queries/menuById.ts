import { supabase } from "@/lib/supabase";

import { queryOptions } from "@tanstack/react-query";

const menuByIdQuery = (id: number) => queryOptions({
		queryKey: ['menus', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('menus')
				.select(
					`
					name,
					items:"menu-items" (
						id,
						cocktail:item (
							name
						)
					)`
				)
				.eq('id', Number(id))
				.single();

			if (error) throw error;
			return data;
		},
		staleTime: 1000 * 60 * 5 // 5 minutes
	})

export default menuByIdQuery;
