import { useQuery } from '@apollo/react-hooks'
import { ALL_BRANCHES } from '../graphql/queries'

function useBranches() {
    const { error, data, loading, refetch } = useQuery(ALL_BRANCHES, {
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data ?.allBranches) return { loading, branches: [], totalCount: null };
    if (error) return { loading, branches: [], totalCount: null }

    return {
      branches: data.allBranches.edges.map(({ node }) => node),
      totalCount: data.allBranches.totalCount,
      loading,
      refetch,
    };
}

export default useBranches;