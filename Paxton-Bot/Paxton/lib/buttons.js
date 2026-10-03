// Paxton Tech interactive buttons.
// The menu uses one WhatsApp message: image + caption + buttons together.
// Clients that reject native interactive buttons receive the same menu image/caption
// without a second buttons-only message.
function makeRows(buttons = []) {
  return buttons.map((b) => ({
    name: 'quick_reply',
    buttonParamsJson: JSON.stringify({
      display_text: String(b.text || '').slice(0, 20),
      id: b.id || b.text
    })
  }));
}

export async function sendButtons(sock, jid, { text, footer, buttons, quoted }) {
  return sock.sendMessage(jid, {
    text,
    footer: footer || '',
    interactiveButtons: makeRows(buttons)
  }, quoted ? { quoted } : {});
}

export async function sendMenuWithButtons(sock, jid, { image, caption, buttons, quoted }) {
  const payload = {
    image,
    caption,
    footer: 'Paxton Tech • Menu Style 4',
    interactiveButtons: makeRows(buttons)
  };
  try {
    return await sock.sendMessage(jid, payload, quoted ? { quoted } : {});
  } catch {
    // Do not send a separate buttons message: keep menu + caption as one message.
    return sock.sendMessage(jid, { image, caption }, quoted ? { quoted } : {});
  }
}
