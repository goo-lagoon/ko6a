import { data } from '../../_data'
import { useRouter } from 'next/router'
import { Repo } from '@projects/Repo'
import { Explorer } from '@projects/Explorer'

export default function Project(props) {
  const router = useRouter()
  const slug = router?.query?.slug
  if (router?.query) {
    // shows contents of repo
    if (slug[1]) {
      return (
        <Explorer slug={slug} org={slug[0]} repo={slug[1]} />
      )
    }

    const repos = data?.projects?.find(({ org }) => org.toLowerCase().replace(' ', '-') == slug).repos

    // shows list of repos
    return (
      <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
        {repos?.map(repo => {
          return (
            <Repo
              org={repo.org}
              repo={repo.repo}
              href={repo.repo}
              description={repo.description}
            />
          )
        })}
      </Stack>
    )
  }
}

import {
  Stack,
  StackDivider
} from '@chakra-ui/react'

const fetcher = (url, owner, repo, path) => fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    owner,
    repo,
    path
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())