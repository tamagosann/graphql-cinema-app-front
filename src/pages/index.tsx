import gql from 'graphql-tag'
import type { GetServerSideProps, NextPage } from 'next'
import { urqlClient } from '../libs/gql-requests'

type Props = {
  films: {
    id: string
    title: string
  }[]
}

const Home: NextPage<Props> = (props) => {
  return (
    <ul>
      {props.films.map((film) => (
        <li key={film.id}>
          id: {film.id} title: {film.title}
        </li>
      ))}
    </ul>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient()

    // 変数なしでGraphQL呼び出し
    const filmsQuery = gql`
      query {
        films {
          id
          title
        }
      }
    `
    const result = await client.query(filmsQuery, {}).toPromise()
    console.log(result)
    return {
      props: {
        films: result.data.films,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
    }
  }
}
