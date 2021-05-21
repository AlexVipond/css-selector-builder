const fetch = require('node-fetch')

const BITLY_ENDPOINT = 'https://api-ssl.bitly.com/v4/shorten'

async function handler (event) {
  const long_url = JSON.parse(event.body).url,
        token = process.env.BITLY_PRIVATE_KEY,
        group_guid = process.env.BITLY_GROUP_GUID,
        data = await (async () => {
          try {
            const response = await fetch(
              BITLY_ENDPOINT,
              {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                  group_guid,
                  long_url,
                  domain: 'bit.ly',
                })
              }
            )

            return await response.json()
          } catch (error) {
            return {
              statusCode: error.statusCode || 500,
              body: {
                error: error.message
              }
            }
          }
        })()

  return {
    statusCode: 200,
    body: JSON.stringify({ data })
  }
}


module.exports = { handler }
