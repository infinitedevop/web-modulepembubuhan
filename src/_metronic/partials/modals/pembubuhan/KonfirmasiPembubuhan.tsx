import {useContext} from 'react'
import {PembubuhanContext} from '../../../../app/context/PembubuhanContext'
import Danger from '../../../assets/images/danger.png'

const KonfirmasiPembubuhan = () => {
  const {konfirmasiPembubuhanModal, setKonfirmasiPembubuhanModal, setPembubuhanberhasilModal} = useContext(PembubuhanContext)

  const handlePembubuhan = () => {
    setKonfirmasiPembubuhanModal(false)
    setPembubuhanberhasilModal(true)
  }
  return (
    <>
      {konfirmasiPembubuhanModal ? (
        <>
          <div
            className='modal fade show d-block'
            id='kt_modal_add_user'
            role='dialog'
            tabIndex={-1}
            aria-modal='true'
          >
            {/* begin::Modal dialog */}
            <div className='modal-dialog modal-dialog-centered' style={{width: '350px', textAlign: 'center'}}>
              {/* begin::Modal content */}
              <div className='modal-content' style={{padding: '22px'}}>
                <img src={Danger} width='20%' style={{margin: '0 auto'}} />
                {/* end::Modal body */}
                <h3 className='modal-title fs-1 mb-2'>Pembubuhan Meterai Elektronik</h3>
                <span style={{fontSize: '12px'}}>Apakah Anda yakin ingin membubuhkan Meterai Elektronik?</span>
                <div className='flex mt-2'>
                  <button className='btn-bubuhkan mt-4' onClick={handlePembubuhan}>
                    Ya
                  </button>
                  <button className='btn-batal mt-3' onClick={() => setKonfirmasiPembubuhanModal(false)}>
                    Batal
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

export {KonfirmasiPembubuhan}
