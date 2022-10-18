/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import {PembubuhanContext} from '../../context/PembubuhanContext'
import Swal from 'sweetalert2'

export function DashboardWrapper() {
  const {setLoading, setModal} = useContext(PembubuhanContext)
  const [listData, setListData] = useState<string[] | any>([])
  const [dataDokumen, setDataDokumen] = useState<string[] | any>([])

  const API_URL = process.env.REACT_APP_API_URL_STAMP

  const histori = useNavigate()

  const {serial_number} = useParams()

  useEffect(() => {
    axios
      .get(`${API_URL}/api/stamp/get-document-info/` + serial_number)
      .then((res) => {
        setDataDokumen(res.data.data.document_info)
        setDataDokumen({...dataDokumen, email: res.data.data.email})
        getListDokumen()
      })
      .catch((err) => {
        console.log(err.response.data.data.sn_data)
        if (err.response.error !== 'Serial Number tidak valid') {
          getListDokumen()

          setDataDokumen({email: err.response.data.data.sn_data.user_email})
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getListDokumen = () => {
    axios
      .get(`${API_URL}/api/stamp/doc-types`)
      .then((res) => {
        setListData(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const postData = (e: any) => {
    e.preventDefault()
    setLoading(true)

    const config = {
      headers: {
        'Content-Type': `application/json`,
      },
    }

    const bodyParameters = {
      serial_number: serial_number,
      email: dataDokumen.email,
      doc_date: dataDokumen.doc_date,
      doc_num: dataDokumen.doc_num,
      doc_type: dataDokumen.doc_type,
    }

    axios
      .post(`${API_URL}/api/stamp/store-document-info`, bodyParameters, config)
      .then((res) => {
        histori('/addDokumen/serial_number=' + serial_number)
        setLoading(false)
        setModal(true)
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: err.response.data.error,
        })
        setLoading(false)
      })
  }

  const handleChange = (e: any) => {
    let name = e.currentTarget.name
    let value = e.currentTarget.value

    setDataDokumen({...dataDokumen, [name]: value})
  }

  const date = new Date()
  const futureDate = date.getDate()
  date.setDate(futureDate)
  const defaultValue = date.toLocaleDateString('en-CA')

  return (
    <div className='mt-6 add-doc'>
      <form className='form-add-doc'>
        <label>Tanggal Dokumen</label>
        <input
          type='date'
          name='doc_date'
          value={dataDokumen.doc_date}
          onChange={handleChange}
          defaultValue={defaultValue}
          required
        />

        <label>Email</label>
        <input
          type='email'
          name='email'
          value={dataDokumen.email}
          placeholder='example@gmail.com'
          onChange={handleChange}
          defaultValue=''
          required
        />

        <label>Nomor Dokumen (Opsional)</label>
        <input
          type='text'
          name='doc_num'
          value={dataDokumen.doc_num}
          placeholder='Masukkan Nomor Dokumen'
          onChange={handleChange}
        />

        <label>Tipe Dokumen</label>
        <select name='doc_type' onChange={handleChange} required>
          <option value={'Dokumen lain-lain'} disabled selected>
            Dokumen lain-lain
          </option>
          {listData.map((el: any, index: any) => {
            return (
              <option value={el.name} key={index}>
                {el.name}
              </option>
            )
          })}
        </select>

        <button className='submit-btn' onClick={postData}>
          Lanjutkan
        </button>
      </form>
    </div>
  )
}
