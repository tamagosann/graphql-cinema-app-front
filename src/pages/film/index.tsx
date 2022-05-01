import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { TopView } from 'components/views/Top'
import { Box } from '@mui/material'

type Props = {
  genreIds: number[]
  isMobileSize: boolean
}

const TopPage: FC<Props> = () => {
  // ssr化も視野に入れ、genreIdなどはここから渡すことにする
  // ここのジャンル一覧も、apiからとってこさせたほうがいい？
  const stabProps = {
    genreIds: [28, 12, 14, 35, 878, 16],
  }
  const { genreIds } = stabProps
  return(
    <>
      <Box>
        {stabProps.genreIds.map(genreId => {
          return (
            <>
            <Box>
            {`genreId ${genreId}`}
            </Box>
            </>
          )
        })}
      </Box>
    </>
  )
}

export default TopPage

// データ量がでかいのでトップページはCSRさせる
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      message: 'hello!',
    },
  }
}
