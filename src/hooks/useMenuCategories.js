import { useQuery } from '@apollo/react-hooks'
import { ALL_MENU_CATEGORIES } from '../graphql/queries'

function useMenuCategories() {
    const { error, data, loading, refetch } = useQuery(ALL_MENU_CATEGORIES, {
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data ?.allMenuCategories) return { loading, menuCategories: [], totalCount: null };
    if (error) return { loading, menuCategories: [], totalCount: null }

    return {
      menuCategories: data.allMenuCategories.edges.map(({ node }) => node),
      totalCount: data.allMenuCategories.totalCount,
      loading,
      refetch,
    };
}

export default useMenuCategories;