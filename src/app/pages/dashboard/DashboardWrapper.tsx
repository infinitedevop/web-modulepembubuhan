/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

export function DashboardWrapper() {

  return (
    <div className='mt-6 add-doc'>
      <form className='form-add-doc'>
        <label>Tanggal Dokumen</label>
        <input type='date'/>

        <label>Email</label>
        <input type='email' placeholder='example@gmail.com' />

        <label>Nomor Dokumen (Opsional)</label>
        <input type='text' placeholder='Masukkan Nomor Dokumen' />

        <label>Tipe Dokumen</label>
        <select>
          <option>Dokumen Lain-Lain</option>
        </select>

        {/* <input type='submit' value='Lanjutkan' className='submit-btn' /> */}
        <button className='submit-btn'>
          <Link to='/addDokumen' className='text-white' style={{textDecoration: 'none'}}>Lanjutkan</Link>
        </button>
      </form>
    </div>
  )
}
