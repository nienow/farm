import Layout from '../components/Layout';
import Contracts from '../components/Contracts';
import { MY_FARMS } from '../data/farms';
import Sites from '../components/Sites';

const IndexPage = () => (
  <Layout>
    <Sites></Sites>
    <Contracts items={MY_FARMS}></Contracts>
  </Layout>
)

export default IndexPage
