import React, { createContext, useState, FC } from "react";
import { PembubuhanContextState } from "./Types";

const contextDefaultValues: PembubuhanContextState = {
  modal: false,
  setModal: () => {},
  konfirmasiPembubuhanModal: false,
  setKonfirmasiPembubuhanModal: () => {},
  pembubuhanberhasilModal: false,
  setPembubuhanberhasilModal: () => {},
  file: '',
  setFile: () => {},
};

export const PembubuhanContext = createContext<PembubuhanContextState>(
  contextDefaultValues
);

const PembubuhanProvider: FC = ({ children }) => {
  const [modal, setModal] = useState(true);
  const [konfirmasiPembubuhanModal, setKonfirmasiPembubuhanModal] = useState(false);
  const [pembubuhanberhasilModal, setPembubuhanberhasilModal] = useState(false);
  const [file, setFile] = useState('');

  return (
    <PembubuhanContext.Provider
      value={{
        modal,
        setModal,
        konfirmasiPembubuhanModal,
        setKonfirmasiPembubuhanModal,
        pembubuhanberhasilModal,
        setPembubuhanberhasilModal,
        file,
        setFile
      }}
    >
      {children}
    </PembubuhanContext.Provider>
  );
};

export default PembubuhanProvider;