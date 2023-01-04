import {Outlet} from 'react-router-dom'
import {ScrollTop} from './components/ScrollTop'
import Logo from '../assets/images/okoce.png'
import {Footer} from './components/Footer'
import { StepPembubuhan } from '../../app/pages/dashboard/_modals/StepPembubuhan'
import PembubuhanProvider from '../../app/context/PembubuhanContext'
import { KonfirmasiPembubuhan } from '../partials/modals/pembubuhan/KonfirmasiPembubuhan'
import { PembubuhanBerhasil } from '../partials/modals/pembubuhan/PembubuhanBerhasil'
import { Loading } from '../partials/modals/pembubuhan/Loading'

const MasterLayout = () => {
  var status : any;
  status = 'user'

  return (
    <PembubuhanProvider>
      <div style={{background: 'white', height:'-webkit-fill-available'}}>
        {status !== 'internal' ? (
          <div style={{width: '100%'}}>
            <span className='title-internal'>DiMeterai</span>
          </div>
          ) : (
          <img src={Logo} style={{margin: '1% 0 0 5%'}} width='100' alt='logo' />
        )}
        <h1 className={`title-pembubuhan ${ status !== 'internal' ? 'top-spacing' : null}`}>
          Pembubuhan e-Meterai
        </h1>
        <div className='post d-flex flex-column-fluid' id='kt_post'>
          {/* <Content> */}
          <Outlet />
          <StepPembubuhan />
          <KonfirmasiPembubuhan />
          <PembubuhanBerhasil />
          <Loading />
          {/* </Content> */}
        </div>
        <Footer />
      </div>
      <ScrollTop />
    </PembubuhanProvider>
  )
}

export {MasterLayout}
