import { supabase } from "@/lib/supabase";
import { queryOptions } from "@tanstack/react-query";

const ordersQuery = queryOptions({
		queryKey: ['orders'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select(
					`
    id,
    customer,
    status,
    items:"order-items" (
      id,
      menu_item:item (
        id,
        cocktail:item (
          id,
          name
        )
			)
    )
  `
				)
				.eq('status', 'Pending');
			if (error) throw error;
			return data;
		}
	})

export default ordersQuery;
