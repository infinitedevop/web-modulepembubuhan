import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {PembubuhanContext} from '../../../../app/context/PembubuhanContext'
import Check from '../../../assets/images/check.png'

const PembubuhanBerhasil = () => {
  const {pembubuhanberhasilModal, setPembubuhanberhasilModal} = useContext(PembubuhanContext)

  const history = useNavigate()

  const handleSukses = () => {
    setPembubuhanberhasilModal(false)
  }

  return (
    <>
      {pembubuhanberhasilModal ? (
        <>
          <div
            className='modal fade show d-block'
            id='kt_modal_add_user'
            role='dialog'
            tabIndex={-1}
            aria-modal='true'
          >
            {/* begin::Modal dialog */}
            <div
              className='modal-dialog modal-dialog-centered'
              style={{width: '350px', textAlign: 'center'}}
            >
              {/* begin::Modal content */}
              <div className='modal-content' style={{padding: '23px'}}>
                <img src={Check} width='20%' style={{margin: '0 auto'}} />
                {/* end::Modal body */}
                <h3 className='modal-title fs-1 mb-2 mt-3'>Pembubuhan Berhasil</h3>
                <span style={{fontSize: '12px'}} className='text-dark'>
                  Silahkan cek email Anda untuk mengunduh file yang sudah Anda bubuhkan. Jika belum
                  menerima email Anda bisaklik tombol kirim ulang email.
                </span>
                <div className='flex mt-2'>
                  <button
                    className='btn-bubuhkan mt-4'
                    onClick={handleSukses}
                  >
                    Oke
                  </button>
                </div>
              </div>
              {/* end::Modal content */}
            </div>
            {/* end::Modal dialog */}
          </div>
          <div className='modal-backdrop fade show'></div>
        </>
      ) : null}
    </>
  )
}

export {PembubuhanBerhasil}
