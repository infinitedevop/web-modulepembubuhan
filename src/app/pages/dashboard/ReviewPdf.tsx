/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useState} from 'react'
// import {Document, Page} from 'react-pdf/dist/entry.webpack'
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack'
import NextIcon from '../../../_metronic/assets/images/next.png'
import PrevIcon from '../../../_metronic/assets/images/prev.png'
import Danger from '../../../_metronic/assets/images/danger.png'
import PrevIconBold from '../../../_metronic/assets/images/prev-bold.png'
import axios from 'axios'
import Swal from 'sweetalert2'
import {Link, useParams} from 'react-router-dom'
import {PembubuhanContext} from '../../context/PembubuhanContext'

export function ReviewPdf() {
  const {setLoading} = useContext(PembubuhanContext)
  const [file, setFile] = useState()

  const API_URL = process.env.REACT_APP_API_URL_STAMP

  let {serial_number} = useParams()

  if (!file) {
    axios
      .get(`${API_URL}/api/stamp/` + serial_number + `/result`, {
        responseType: 'blob',
      })
      .then((res) => {
        setFile(res.data)
      })
      .catch(async (err) => {
        let error = JSON.parse(await err.response.data.text())
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: error.error,
          allowOutsideClick: false,
        })
      })
  }

  const kirimEmail = () => {
    setLoading(true)
    axios
      .post(`${API_URL}/api/stamp/` + serial_number + `/resend-email`)
      .then((res) => {
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: res.data.data.message,
        })
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

  const downloadPdf = () => {
    let url = window.URL.createObjectURL(file!)
    const link = document.createElement('a');
    link.href = url;
    link.download = file!

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  function onDocumentLoadSuccess({numPages}: any) {
    setNumPages(numPages)
  }

  function changePage(offset: any) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(+1)
  }

  return (
    <div className='upload-file2' style={{marginBottom: '10%', marginTop: '5%'}}>
      <span className='flex' style={{background: '#D9D9D9'}}>
        {numPages! > 1 ? (
          <div
            className='pdf-pagination mb-3'
            style={{display: 'flex', justifyContent: 'space-between'}}
          >
            <button
              type='button'
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className={`pagination-pdf fw-bold`}
            >
              <img src={pageNumber === 1 ? PrevIcon : PrevIconBold} style={{paddingRight: '8px'}} />
              Sebelumnya
            </button>
            <p className='font-semibold'>
              {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
            <button
              type='button'
              disabled={pageNumber >= numPages!}
              onClick={nextPage}
              className={`pagination-pdf fw-bold`}
            >
              Selanjutnya <img src={NextIcon} style={{paddingLeft: '8px'}} />
            </button>
          </div>
        ) : null}
        <div id='pdf-wrapper'>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>
        <label className='text-center mt-6'>
          Silahkan cek email Anda untuk mengunduh file yang sudah Anda bubuhkan. Jika belum menerima
          email Anda bisa klik tombol <b>kirim ulang email</b>, atau Anda bisa langsung{' '}
          <b className='bold'>Unduh</b> File
        </label>
        <div className='preview-btn mt-7 mb-5'>
          <button className='btn-kirim' onClick={kirimEmail}>
            Kirim Ulang Email
          </button>
          {/* <Link to={file ? file : 'sdfsdf'} className='btn-download text-center' download>Download</Link> */}
          <button className='btn-download' onClick={downloadPdf}>
            Download
          </button>
        </div>
        <span className='pembubuhan-warning'>
          <img src={Danger} width={15} style={{marginRight: '5px'}} />
          Dokumen hanya bisa dikirim ulang email atau didownload selama satu hari setelah pembubuhan
        </span>
      </span>
    </div>
  )
}
