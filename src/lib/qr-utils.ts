import QRCode from "qrcode";

export async function generateQRCodeBase64(
  ticketCode: string,
): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/events/verify/${ticketCode}`;

  const dataUrl = await QRCode.toDataURL(url, {
    width: 280,
    margin: 2,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });

  return dataUrl;
}

export async function generateQRCodeSVG(ticketCode: string): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/events/verify/${ticketCode}`;
  return QRCode.toString(url, { type: "svg", width: 200, margin: 2 });
}
