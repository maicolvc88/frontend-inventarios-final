import { axiosInstance } from '../helpers/axios-config'

const getEstadoEquipos = () => {
    return axiosInstance.get('estado-equipo', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const crearEstadoEquipos = (data) => {
    return axiosInstance.post('estado-equipo', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editEstadoEquipos = (estadoequipoId, data) => {
    return axiosInstance.put(`estado-equipo/${estadoequipoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getEstadoEquipos, crearEstadoEquipos, editEstadoEquipos
}