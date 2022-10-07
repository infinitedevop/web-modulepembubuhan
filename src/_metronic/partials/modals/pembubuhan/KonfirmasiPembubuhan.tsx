import {useContext} from 'react'
import {PembubuhanContext} from '../../../../app/context/PembubuhanContext'
import Danger from '../../../assets/images/danger.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const KonfirmasiPembubuhan = () => {
  const {
    konfirmasiPembubuhanModal,
    setKonfirmasiPembubuhanModal,
    setPembubuhanberhasilModal,
    setLoading,
    coord,
    setFile,
  } = useContext(PembubuhanContext)

  const llx = 'llx' as string
  const lly = 'lly' as string
  const urx = 'urx' as string
  const ury = 'ury' as string
  const serial_number = 'serial_number' as string
  const file = 'file' as string
  const pages = 'pages' as string

  const API_URL = process.env.REACT_APP_API_URL_STAMP

  const histori = useNavigate()

  const handlePembubuhan = (e: any) => {
    e.preventDefault()
    setKonfirmasiPembubuhanModal(false)
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    }
    var bodyFormData = new FormData()
    bodyFormData.append('serial_number', coord[serial_number as keyof typeof coord])
    bodyFormData.append('llx', coord[llx as keyof typeof coord])
    bodyFormData.append('lly', coord[lly as keyof typeof coord])
    bodyFormData.append('urx', coord[urx as keyof typeof coord])
    bodyFormData.append('ury', coord[ury as keyof typeof coord])
    bodyFormData.append('file', coord[file as keyof typeof coord])
    bodyFormData.append('page', coord[pages as keyof typeof coord])

    axios
      .post(`${API_URL}/api/stamp`, bodyFormData, config)
      .then((res) => {
        setFile(res.data)
        histori(`/reviewPdf/serial_number=${coord[serial_number as keyof typeof coord]}`)
        setPembubuhanberhasilModal(true)
        setTimeout(() => {
          setLoading(false)
        }, 7000);
      })
      .catch((err) => {
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: err.response.data.error,
        })
      })
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
            <div
              className='modal-dialog modal-dialog-centered'
              style={{width: '350px', textAlign: 'center'}}
            >
              {/* begin::Modal content */}
              <div className='modal-content' style={{padding: '22px'}}>
                <img src={Danger} width='20%' style={{margin: '0 auto'}} alt='danger-icon'/>
                {/* end::Modal body */}
                <h3 className='modal-title fs-1 mb-2'>Pembubuhan Meterai Elektronik</h3>
                <span style={{fontSize: '12px'}}>
                  Apakah Anda yakin ingin membubuhkan Meterai Elektronik?
                </span>
                <div className='flex mt-2'>
                  <button className='btn-bubuhkan mt-4' onClick={handlePembubuhan}>
                    Ya
                  </button>
                  <button
                    className='btn-batal mt-3'
                    onClick={() => setKonfirmasiPembubuhanModal(false)}
                  >
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
