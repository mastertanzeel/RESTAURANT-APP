import { useQuery } from '@apollo/react-hooks'
import { ALL_OFFERS } from '../graphql/queries'

function useOffers() {
    const { error, data, loading, refetch } = useQuery(ALL_OFFERS, {
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data ?.allOffers) return { loading, offers: [], totalCount: null };
    if (error) return { loading, offers: [], totalCount: null }

    return {
      offers: data.allOffers.edges.map(({ node }) => node),
      totalCount: data.allOffers.totalCount,
      loading,
      refetch,
    };
}

export default useOffers;