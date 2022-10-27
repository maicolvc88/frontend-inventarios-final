import { axiosInstance} from '../helpers/axios-config';

const getInventarios = () => {
    return axiosInstance.get('inventario', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearInventario = (data) => {
    return axiosInstance.post('inventario', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editInventarios = (inventarioId, data) => {
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getInventarios, crearInventario, editInventarios
}