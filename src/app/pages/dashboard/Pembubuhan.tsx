/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useContext, useRef, useEffect} from 'react'
import {PembubuhanContext} from '../../context/PembubuhanContext'
// import {Document, Page} from 'react-pdf/dist/entry.webpack'
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack'
import NextIcon from '../../../_metronic/assets/images/light-next.png'
import NextIconBold from '../../../_metronic/assets/images/next.png'
import PrevIcon from '../../../_metronic/assets/images/prev.png'
import PrevIconBold from '../../../_metronic/assets/images/prev-bold.png'
import MeteraiImg from '../../../_metronic/assets/images/meterai.png'
import {useParams} from 'react-router-dom'
import {Loading} from '../../../_metronic/partials/modals/pembubuhan/Loading'

export function Pembubuhan() {
  const {file, setFile, setKonfirmasiPembubuhanModal, coord, setCoord, setLoading, loading} =
    useContext(PembubuhanContext)

  let {serial_number} = useParams()

  const fabric = require('fabric').fabric

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

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      var canvas = new fabric.Canvas('canvasMeterai', {
        preserveObjectStacking: true,
      })
      canvas.setDimensions({
        width: ref.current?.clientWidth,
        height: ref.current?.clientHeight,
      })

      var eMeterai = document.getElementById('meterai')

      var imgMeterai = new fabric.Image(eMeterai, {
        preserveObjectStacking: true,
        hasControls: false,
        hasBorders: false,
        scaleX: 0.88,
        scaleY: 0.88,
      })

      canvas.add(imgMeterai)

      canvas.on('object:moving', function (e: any) {
        var obj = e.target
        canvas.add(imgMeterai)

        let lower_x_coord = obj.setCoords().oCoords.bl.x
        let lower_y_coord = canvas.getHeight() - obj.setCoords().oCoords.bl.y
        let upper_x_coord = obj.setCoords().oCoords.tr.x
        let upper_y_coord = canvas.getHeight() - obj.setCoords().oCoords.tr.y

        setCoord({
          ...coord,
          llx: lower_x_coord,
          lly: lower_y_coord,
          urx: upper_x_coord,
          ury: upper_y_coord,
          serial_number: serial_number,
        })

        if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
          return
        }
        obj.setCoords()
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
          obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top)
          obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left)
        }
        // bot-right corner
        if (
          obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height ||
          obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width
        ) {
          obj.top = Math.min(
            obj.top,
            obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top
          )
          obj.left = Math.min(
            obj.left,
            obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left
          )
        }
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handlePembubuhan = () => {
    setKonfirmasiPembubuhanModal(true)
  }

  const handleGantiDokumen = (e: any) => {
    if (e.currentTarget.files.length) {
      const data = e.currentTarget.files[0]
      let name = 'file'
      setCoord({...coord, [name]: data})
      setFile(URL.createObjectURL(data))
    }
  }

  const pages = 'pages' as string

  if (coord[pages as keyof typeof coord] !== pageNumber) {
    setCoord({
      ...coord,
      pages: pageNumber,
    })
  }

  return (
    <>
      {loading ? <Loading /> : null}
      <span className='flex' style={{background: '#D9D9D9'}}>
        <div>
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
                <img
                  src={pageNumber === 1 ? PrevIcon : PrevIconBold}
                  style={{paddingRight: '8px'}}
                  alt='prev-icon'
                />
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
                Selanjutnya{' '}
                <img
                  src={pageNumber === numPages ? NextIcon : NextIconBold}
                  style={{paddingLeft: '8px'}}
                  alt='next-icon'
                />
              </button>
            </div>
          ) : null}
          <div ref={ref} id='pdf-wrapper mx-auto' style={{width: 'fit-content', margin : '0 auto'}}>
            <div className='canvas-wrapper' style={{position: 'absolute'}}>
              <canvas id='canvasMeterai' className='z-2' style={{zIndex: '2'}}>
                <img
                  src={MeteraiImg}
                  id='meterai'
                  className='z-2 img-canvas'
                  alt='meterai'
                  style={{display: 'none', position: 'inherit', width: '300% !important'}}
                />
              </canvas>
            </div>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} width={600} />
            </Document>
          </div>
          <button className='btn-bubuhkan mt-5' onClick={handlePembubuhan}>
            Bubuhkan Meterai Elektronik
          </button>
          <input
            type='file'
            id='upload-button2'
            onChange={handleGantiDokumen}
            name='dokumen'
            hidden
          />
          <label htmlFor='upload-button2' className='btn-ganti-dok mt-5 text-center'>
            Ganti Dokumen
          </label>
        </div>
      </span>
    </>
  )
}
