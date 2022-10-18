import {useContext} from 'react'
// import Success from '../../../assets/images/success-icon.png'
import {PembubuhanContext} from '../../../context/PembubuhanContext'
import IconSatu from '../../../../_metronic/assets/images/satu.png'
import IconDua from '../../../../_metronic/assets/images/dua.png'
import IconTiga from '../../../../_metronic/assets/images/tiga.png'
import IconEmpat from '../../../../_metronic/assets/images/empat.png'

const StepPembubuhan = () => {
  const {modal, setModal} = useContext(PembubuhanContext)

  const step = [
    {
      title: 'Upload',
      text: 'Klik tombol upload dan pilih dokumen yang ingin dibubuhkan. Pastikan file memiliki format PDF.',
    },
    {
      title: 'Pilih Posisi',
      text: 'Pilih halaman dan posisi pembubuhan dengan menggeser icon e-meterai yang ada di layar.',
    },
    {
      title: 'Pembubuhan',
      text: 'Klik tombol \n “Bubuhkan e-Meterai” untuk melakukan pembubuhan e-Meterai.',
    },
    {
      title: 'Download',
      text: 'Donwload kembali file Anda. Kini dokumen Anda telah sukses dibubuhkan dengan e-meterai!',
    },
  ]
  
  return (
    <>
      {modal ? (
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
              className=' modal-dialog-centered animation-modal'
              style={{width: '75%', margin: '0 auto', marginTop: '1.5%'}}
            >
              {/* begin::Modal content */}

              <div className='modal-content' style={{padding: '5%'}}>
                {/* <img src={Success} width='40%' /> */}
                {/* end::Modal body */}
                <h1 className='modal-title'>CARA MELAKUKAN PEMBUBUHAN e-Meterai</h1>
                <div
                  className='row g-xl-12 gy-5'
                  style={{justifyContent: 'space-between', marginTop: '20px'}}
                >
                  {step.map((el, index) => {
                    return (
                      <div
                        key={index}
                        className={`text-white step-border row card-xl-stretch ${
                          index === 0
                            ? 'bg-dark-cyan'
                            : index === 1
                            ? 'bg-orange'
                            : index === 2
                            ? 'bg-purple'
                            : 'bg-blue'
                        }`}
                        style={{width: '24%', textAlign: 'center', padding: '50px 13px'}}
                      >
                        <img
                          src={`${
                            index === 0
                              ? IconSatu
                              : index === 1
                              ? IconDua
                              : index === 2
                              ? IconTiga
                              : IconEmpat
                          }`}
                          style={{
                            width: '60px',
                            height: '40px',
                            margin: '0 auto',
                            marginTop: '-15%',
                          }}
                          alt='icon'
                        />
                        <span style={{marginTop: '10px', fontWeight: 'bold'}}>{el.title}</span>
                        <span style={{fontSize: '10px', marginTop: '8px'}}>{el.text}</span>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <input type='checkbox' className='hide-tutorial' /> Jangan tampilkan tutorial ini
                  lagi
                </div>
                <button className='submit-btn fs-5' onClick={() => setModal(!modal)}>
                  Oke Saya Mengerti
                </button>
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

export {StepPembubuhan}
