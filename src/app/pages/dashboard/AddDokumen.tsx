/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useContext} from 'react'
import {PembubuhanContext} from '../../context/PembubuhanContext'
import {StepPembubuhan} from './_modals/StepPembubuhan'
import PdfLogo from '../../../_metronic/assets/images/pdf-logo.png'
import { UploadDokumen } from './UploadDokumen'
import { Pembubuhan } from './Pembubuhan'

export function AddDokumen() {
  const {modal, file} = useContext(PembubuhanContext)

  if (modal) {
    setTimeout(() => {
      ;<StepPembubuhan />
    }, 5000)
  }

  return (
    <div className={`${file? 'upload-file2': 'upload-file'}`} style={{marginBottom: '10%', marginTop: '5%'}}>
      {!file ?
      <UploadDokumen />
      :
      <Pembubuhan />  
    }
    </div>
  )
}
