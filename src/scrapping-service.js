const cheerio = require('cheerio')
const rp = require('request-promise');
const URL_BASE = 'https://linkotes.com/arenavision/'

const stringService = require('./string-service');

/**
 * Retorna toda la info relevante en la pagina de linkotes
 */
const getAcestreamLinks = () => rp({
    uri: URL_BASE,
    transform:  body => cheerio.load(body)
})
    .then(
        $ => {
            const trs = $('tbody tr').toArray()
                .map(
                    a => $('td', a).toArray().map(a => $(a).text().trim())
                )
                .filter(
                    a => a && a.length === 4
                )
                .map(
                    a => ({
                        hora: a[0],
                        deporte: a[1],
                        retrasmision: a[2],
                        // canales: stringService.getCanales(a[3])
                        canales: a[3]
                    })
                );

            
            const resp = trs.map(
                tr => stringService.getCanales(tr.canales)
                    .then(
                        realCanal => {
                            // console.log(realCanal);

                            return {
                                ... tr,
                                canales: realCanal
                            }
                        }
                    )
            )


            return Promise.all(resp)
        }
    )

exports.getAcestreamLinks = getAcestreamLinks;