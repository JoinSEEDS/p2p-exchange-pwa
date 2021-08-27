export const settings = ({ settings }) => settings

export const acceptLim = ({ settings }) => settings.rows.find(el => el.key === 'b.accpt.lim').value[1] || ''

export const sellerConfirmLim = ({ settings }) => settings.rows.find(el => el.key === 's.confrm.lim').value[1] || ''

export const buyerConfirmLim = ({ settings }) => settings.rows.find(el => el.key === 'b.confrm.lim').value[1] || ''
