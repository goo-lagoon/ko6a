import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Explorer } from '@projects/Explorer'
import useSWR from 'swr'
import { TeamContext } from '@contexts/TeamContext'

export default function FilePage({ ...props }) {
  const router = useRouter()
  const { project, repo } = router?.query
  const { currentTeam } = useContext(TeamContext)

  const { data: repoData, error } = useSWR(project && currentTeam && repo && `/api/teams/${currentTeam}/projects/${project}/repos/${repo}`)

  if (error) return 'scawy :('
  if (!error && !repoData) return null

  return (
    <Explorer owner={repoData?.owner} repo={repoData?.repo} />
  )
}
