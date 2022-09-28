/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {PembubuhanContext} from '../../context/PembubuhanContext'
import Swal from 'sweetalert2'

export function DashboardWrapper() {
  const {loading, setLoading} = useContext(PembubuhanContext)
  const [listData, setListData] = useState<string[] | any>([])
  const [dataDokumen, setDataDokumen] = useState<string[] | any>([])

  const API_URL = process.env.REACT_APP_API_URL_STAMP

  const histori = useNavigate()

  const {serial_number} = useParams()

  useEffect(() => {
    axios
      .get(`${API_URL}/api/stamp/get-document-info/` + serial_number)
      .then((res) => {
        getListDokumen()
      })
      .catch((err) => {
        if (err.response.error !== 'Serial Number tidak valid') {
          getListDokumen()
        }
      })
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
        histori('/addDokumen/serial_number='+serial_number)
        setLoading(false)
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: err.response.data.error,
        })
      })
  }

  const handleChange = (e: any) => {
    let name = e.currentTarget.name
    let value = e.currentTarget.value

    setDataDokumen({...dataDokumen, [name]: value})
  }

  return (
    <div className='mt-6 add-doc'>
      <form className='form-add-doc'>
        <label>Tanggal Dokumen</label>
        <input
          type='date'
          name='doc_date'
          value={dataDokumen.doc_date}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type='email'
          name='email'
          value={dataDokumen.email}
          placeholder='example@gmail.com'
          onChange={handleChange}
          required
        />

        <label>Nomor Dokumen (Opsional)</label>
        <input
          type='text'
          name='doc_num'
          value={dataDokumen.doc_num}
          placeholder='Masukkan Nomor Dokumen'
          onChange={handleChange}
          required
        />

        <label>Tipe Dokumen</label>
        <select name='doc_type' onChange={handleChange} required>
          <option disabled selected>
            Pilih Tipe Dokumen
          </option>
          {listData.map((el: any, index: any) => {
            return (
              <option value={el.name} key={index}>
                {el.name}
              </option>
            )
          })}
        </select>

        {/* <input type='submit' value='Lanjutkan' className='submit-btn' /> */}
        <button className='submit-btn' onClick={postData}>
          {/* <Link to='/addDokumen' className='text-white' style={{textDecoration: 'none'}}> */}
          Lanjutkan
          {/* </Link> */}
        </button>
      </form>
    </div>
  )
}
