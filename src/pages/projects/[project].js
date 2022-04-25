import { useRouter } from 'next/router'
import { Repo } from '@projects/Repo'
import { Stack, StackDivider, Heading, Box } from '@chakra-ui/react'
import useSWR from 'swr'

export default function Project({ ...props }) {
  const router = useRouter()
  const { project: projectName } = router?.query

  const { data: project, error } = useSWR(projectName && `/api/projects/${projectName}`)
  
  return (
    <Box p="8">
      <Heading pb="2">repos</Heading>
      <Stack spacing="8" py="5" divider={<StackDivider />}>
        {project?.repos?.map(repo => {
          return (
            <Repo
              owner={repo.owner}
              name={repo.repo}
              href={repo.repo}
              description={repo.description}
            />
          )
        })}
      </Stack>
    </Box>
  )
}
