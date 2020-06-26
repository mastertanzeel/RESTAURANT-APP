import { useQuery } from '@apollo/react-hooks'
import { ALL_MENU_ITEMS } from '../graphql/queries'

const category = null;

function useMenuItems () {
  const { error, data, loading, refetch } = useQuery(ALL_MENU_ITEMS, {
    variables: { category },
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data ?.allRestaurants) return { loading, menuItems: [], totalCount: null };
  if (error) return { loading, menuItems: [], totalCount: null }

  return {
    menuItems: data.allMenuItems.edges.map(({ node }) => node),
    totalCount: data.allMenuItems.totalCount,
    loading,
    refetch,
  };
}

export default useMenuItems;