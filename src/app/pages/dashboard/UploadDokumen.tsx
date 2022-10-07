/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext} from 'react'
import PdfLogo from '../../../_metronic/assets/images/pdf-logo.png'
import {PembubuhanContext} from '../../context/PembubuhanContext'

export function UploadDokumen() {
  const {setFile, setCoord, coord, setLoading} = useContext(PembubuhanContext)

  const uploadKTPPreview = (e: any) => {
    if (e.currentTarget.files.length) {
      const data = e.currentTarget.files[0]
      let name = 'file'
      setCoord({...coord, [name]: data})
      setFile(URL.createObjectURL(data))
      setLoading(true)
    }
  }

  return (
    <span className='flex'>
      <ul style={{listStyleType: 'none'}}>
        <li
          id='empty'
          className='h-full w-full text-center flex flex-col justify-center items-center'
        >
          <div className='mx-auto my-auto'>
            <label htmlFor='upload-button2'>
              <img src={PdfLogo} width='55' className='pdf-logo' alt='pdf-logo' />
              <p className='text-center text-sm mt-7 font-600' style={{lineHeight: '1px'}}>
                Klik untuk mengunggah atau Seret file PDF Anda disini
              </p>
              <span className='keterangan'>Ukuran dokumen yang direkomendasikan adalah a4</span>
            </label>
            <input
              type='file'
              id='upload-button2'
              style={{display: 'none'}}
              onChange={uploadKTPPreview}
              name='dokumen'
              // required={true}
            />
          </div>
        </li>
      </ul>
    </span>
  )
}
