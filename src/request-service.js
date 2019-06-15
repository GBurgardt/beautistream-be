const rp = require('request-promise');

const URL_BASE = 'https://linkotes.com/arenavision/aj_canal.php'



const getIdAcestreamByIdCanal = (idCanal) => 
    rp({
        method: 'POST',
        uri: URL_BASE,
        formData: {
            id: idCanal,
            nocatxe: 0
        },
        headers: {}
    })
        .catch(
            err => {
                idCanal,
                err
            }
        )

const getIdAcestreamByArrayOfIdCanal = (arrayIds) => {
    

    return Promise.all(
        arrayIds.map(
            id => getIdAcestreamByIdCanal(id)
        )
    ).then(
        a => a
            .filter(b => b !== undefined && b !== null)
            .map(
                b => {
                    return JSON.parse(b)
                }
            )
    )

    // return null;
}

exports.getIdAcestreamByIdCanal = getIdAcestreamByIdCanal
exports.getIdAcestreamByArrayOfIdCanal = getIdAcestreamByArrayOfIdCanal