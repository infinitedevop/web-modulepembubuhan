export type PembubuhanContextState = {
  modal: boolean
  setModal(modal: boolean): void
  loading: boolean
  setLoading(loading: boolean): void
  konfirmasiPembubuhanModal: boolean
  setKonfirmasiPembubuhanModal(konfirmasiPembubuhanModal: boolean): void
  pembubuhanberhasilModal: boolean
  setPembubuhanberhasilModal(pembubuhanberhasilModal: boolean): void
  file: string
  setFile(file: string): void
  coord: {}
  setCoord(coord: {}): void
}
