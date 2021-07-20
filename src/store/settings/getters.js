export const settings = ({ settings }) => settings

export const acceptLim = ({ settings }) => settings.rows.find(el => el.key === 'b.accpt.lim').value[1] || ''

export const confirmLim = ({ settings }) => settings.rows.find(el => el.key === 'b.confrm.lim').value[1] || ''
