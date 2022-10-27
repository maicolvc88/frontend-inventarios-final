import { axiosInstance } from '../helpers/axios-config'

const getMarcas = () => {
    return axiosInstance.get('marca', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const crearMarcas = (data) => {
    return axiosInstance.post('marca', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editMarcas = (marcaId, data) => {
    return axiosInstance.put(`usuario/${marcaId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getMarcas, crearMarcas, editMarcas
}