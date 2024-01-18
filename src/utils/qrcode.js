import qrcode from 'qrcode'

export const generateQrCode = (data = "") => {
    const qr = qrcode.toDataURL(JSON.stringify(data), {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin:5,
        color: {
            dark: "#09c",
            light: "#FFBF60FF"
        }
    })
    return qr
}