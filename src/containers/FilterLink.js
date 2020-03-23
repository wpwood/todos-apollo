import React from 'react'
import Link from '../components/Link'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { VISIBILITY_FILTER_QUERY } from '../queries/VISIBILITY_FILTER_QUERY'
import { SET_VISIBILITY_FILTER_MUTATION, updateLocalCache } from '../queries/SET_VISIBILITY_FILTER_MUTATION'

const FilterLink = ({filter, children}) => {
  const { loading, error, data } = useQuery(VISIBILITY_FILTER_QUERY)
  const [setVisibilityFilter] = useMutation(
    SET_VISIBILITY_FILTER_MUTATION,
    {
      update(cache, { data: { setVisibilityFilter } }) {
        updateLocalCache(cache, setVisibilityFilter)
      }
    }
  )

  if (loading) return <h2>Loading...</h2>
  if (error) return <div>{error}</div>

  return (
    <Link
      active={data.visibilityFilter === filter}
      onClick={e => {
        e.preventDefault()
        setVisibilityFilter({ variables: { filter } })
      }}
    >
      {children}
    </Link>
  )
}

export default FilterLink
