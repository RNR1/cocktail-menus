import { supabase } from '@/lib/supabase';
import { queryOptions } from '@tanstack/react-query';

const menusQuery = queryOptions({
	queryKey: ['menus'],
	queryFn: async () => {
		const { data, error } = await supabase.from('menus').select('*');
		if (error) throw error;
		return data;
	}
});

export default menusQuery;
