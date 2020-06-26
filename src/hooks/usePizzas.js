import { useQuery } from '@apollo/react-hooks'
import { ALL_PIZZAS } from '../graphql/queries'

function usePizzas() {
  const { error, data, loading, refetch } = useQuery(ALL_PIZZAS, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data ?.allPizzas) return { loading, pizzas: [], totalCount: null };
  if (error) return { loading, pizzas: [], totalCount: null }

  return {
    pizzas: data.allPizzas.edges.map(({ node }) => node),
    totalCount: data.allPizzas.totalCount,
    loading,
    refetch,
  };
}

export default usePizzas;