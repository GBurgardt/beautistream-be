const requestService = require('./request-service')

const getCanalesWithoutId = (trtext) => {

    const parseCanales = (w31, w32) => trtext
        .substring(
            w31, w32
        )
        .trim()
        .split(' ')
    
    const w3Array = trtext
        .split(' ')
        .filter(word => word[0] !== 'a');
    
    const resp = w3Array
        .map(
            (w3, i3) => ({
                languaje: w3,
                acestreamIds: i3+1 < w3Array.length ?
                    parseCanales(
                        trtext.indexOf(w3) + w3.length, 
                        trtext.indexOf(w3Array[i3+1])
                    ) :
                    parseCanales(
                        trtext.indexOf(w3) + w3.length, 
                        trtext.length
                    )
            })
        )
        .map(
            canal => ({
                ... canal,
                acestreamIds: 
                    canal.acestreamIds
                        .map(
                            avId => Number(avId.substring(2))
                        )
                        // .map(
                        //     id => requestService.getIdAcestreamByIdCanal(id)
                        // )
                
            })
        )

    return resp;
}

const getCanales = (trtext) => {
    
    const arrayPromises = getCanalesWithoutId(trtext)
        .map(
            canal => requestService.getIdAcestreamByArrayOfIdCanal(canal.acestreamIds)
                .then(
                    realIds => {
                        return {
                            ... canal,
                            acestreamIds: realIds
                        }
                    }
                )
        )

    return Promise.all(arrayPromises);
}

exports.getCanales = getCanales