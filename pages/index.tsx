import Layout from '../components/Layout'
import Contracts from '../components/Contracts';
import { MY_FARMS } from '../data/farms';

const IndexPage = () => (
  <Layout>
    <Contracts items={MY_FARMS}></Contracts>
  </Layout>
)

export default IndexPage
