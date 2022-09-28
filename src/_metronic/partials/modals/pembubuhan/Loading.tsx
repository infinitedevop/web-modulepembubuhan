import {useContext} from 'react'
import { PembubuhanContext } from '../../../../app/context/PembubuhanContext'


const Loading = () => {
  const {loading} = useContext(PembubuhanContext)

  return (
    <>
      {loading ? (
        <>
          <div
            className='modal fade show d-block'
            id='kt_modal_add_user'
            role='dialog'
            tabIndex={-1}
            aria-modal='true'
          >
            {/* begin::Modal dialog */}
            <div className='modal-dialog modal-dialog-centered modal-loading' style={{width: '350px'}}>
              {/* begin::Modal content */}
              {/* <div className='modal-content'> */}
                <div className='lds-ellipsis bg-white'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                {/* </div> */}
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

export {Loading}
