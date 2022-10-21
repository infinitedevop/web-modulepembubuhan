/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useEffect} from 'react'
import {PembubuhanContext} from '../../context/PembubuhanContext'
import {StepPembubuhan} from './_modals/StepPembubuhan'
import {UploadDokumen} from './UploadDokumen'
import {Pembubuhan} from './Pembubuhan'

export function AddDokumen() {
  const {modal, file} = useContext(PembubuhanContext)

  return (
    <div
      className={`${file ? 'upload-file2' : 'upload-file'}`}
      style={{marginBottom: '10%', marginTop: '5%'}}
    >
      {modal ? <StepPembubuhan /> : null}
      {!file ? <UploadDokumen /> : <Pembubuhan />}
    </div>
  )
}
