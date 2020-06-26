import { useQuery } from '@apollo/react-hooks'
import { ALL_TOPPINGS } from '../graphql/queries'

function useToppings() {
    const { error, data, loading, refetch } = useQuery(ALL_TOPPINGS, {
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data ?.allToppings) return { loading, toppings: [], totalCount: null };
    if (error) return { loading, toppings: [], totalCount: null }

    return {
      toppings: data.allToppings.edges.map(({ node }) => node),
      totalCount: data.allToppings.totalCount,
      loading,
      refetch,
    };
}

export default useToppings;