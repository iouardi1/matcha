import type { ReactElement } from 'react'
import React from 'react'
import Layout from '@/components/layout'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
    </>
  )
}
 
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Page/>
    </Layout>
  )
}
 
export default Page