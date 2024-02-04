import dotenv from 'dotenv'
dotenv.config()
const BOT_TOKEN = process.env.BOT_TOKEN

async function telegramValidate(initData) {
    try {
        const dataParams = new URLSearchParams(initData)
        const hash = dataParams.get('hash')
        dataParams.delete('hash')

        const dataCheckString = Array.from(dataParams.keys())
            .sort()
            .map((key) => `${key}=${dataParams.get(key)}`)
            .join('\n')

        const encoder = new TextEncoder()
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode('WebAppData'),
            { name: 'HMAC', hash: { name: 'SHA-256' } },
            false,
            ['sign']
        )

        const secretKey = await crypto.subtle.sign(
            'HMAC',
            keyMaterial,
            encoder.encode(BOT_TOKEN)
        )

        const hmac = await crypto.subtle.sign(
            'HMAC',
            await crypto.subtle.importKey(
                'raw',
                secretKey,
                { name: 'HMAC', hash: { name: 'SHA-256' } },
                false,
                ['sign']
            ),
            encoder.encode(dataCheckString)
        )

        const hexHmac = Array.from(new Uint8Array(hmac))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')

        return hexHmac === hash
    } catch (error) {
        console.error('Validation error:', error)
    }
}

export default telegramValidate
