import React, {createContext, useState, FC} from 'react'
import {PembubuhanContextState} from './Types'

const contextDefaultValues: PembubuhanContextState = {
  modal: false,
  setModal: () => {},
  loading: false,
  setLoading: () => {},
  konfirmasiPembubuhanModal: false,
  setKonfirmasiPembubuhanModal: () => {},
  pembubuhanberhasilModal: false,
  setPembubuhanberhasilModal: () => {},
  file: '',
  setFile: () => {},
  coord: {},
  setCoord: () => [],
}

export const PembubuhanContext = createContext<PembubuhanContextState>(contextDefaultValues)

const PembubuhanProvider: FC = ({children}) => {
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [konfirmasiPembubuhanModal, setKonfirmasiPembubuhanModal] = useState(false)
  const [pembubuhanberhasilModal, setPembubuhanberhasilModal] = useState(false)
  const [file, setFile] = useState('')
  const [coord, setCoord] = useState({})

  return (
    <PembubuhanContext.Provider
      value={{
        modal,
        setModal,
        coord,
        setCoord,
        loading,
        setLoading,
        konfirmasiPembubuhanModal,
        setKonfirmasiPembubuhanModal,
        pembubuhanberhasilModal,
        setPembubuhanberhasilModal,
        file,
        setFile,
      }}
    >
      {children}
    </PembubuhanContext.Provider>
  )
}

export default PembubuhanProvider
