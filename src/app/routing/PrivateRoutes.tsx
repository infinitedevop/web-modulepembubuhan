import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {AddDokumen} from '../pages/dashboard/AddDokumen'
import {ReviewPdf} from '../pages/dashboard/ReviewPdf'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        {/* <Route path='auth/*' element={<Navigate to='/inputData' />} /> */}
        {/* Pages */}
        {/* <Route path='inputData' element={<DashboardWrapper />} /> */}
        <Route path='inputData/serial_number=:serial_number' element={<DashboardWrapper />} />
        <Route path='addDokumen/serial_number=:serial_number' element={<AddDokumen />} />
        <Route path='reviewPdf/serial_number=:serial_number' element={<ReviewPdf />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/inputData/serial_number=:serial_number' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
