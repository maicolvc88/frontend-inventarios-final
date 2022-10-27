import React, { useState, useEffect } from 'react'
import { getEstadoEquipos } from '../../services/estadoEquipoService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipo } from '../../services/tipoEquipoService';
import { getUsuarios } from '../../services/usuarioService';
import { crearInventario } from '../../services/inventarioService';
import Swal from 'sweetalert2';

export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {

    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ estados, setEstados ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState({});
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', fechaCompra = '', precio = '', usuario, marca, tipo, estado} = valoresForm;

    const listarUsuarios = async () => {
        try {
            const {data} = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.log(error)
        }
    }
    
    const listarMarcas = async () => {
        try {
            const {data} = await getMarcas();
            setMarcas(data);
        } catch (error) {
            console.log(error)
        }
    }

    const listarTipos = async () => {
        try {
            const {data} = await getTiposEquipo();
            setTipos(data);
        } catch (error) {
            console.log(error)
        }
    }

    const listarEstados = async () => {
        try {
            const {data} = await getEstadoEquipos();
            setEstados(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarUsuarios()        
    }, []);

    useEffect(() => {
        listarMarcas();
    }, []);

    useEffect(() => {
        listarTipos();
    }, []);

    useEffect(() => {
        listarEstados();
    }, []);

    const handleOnChange = ({ target}) => {
        const { name, value } = target;
        setValoresForm({...valoresForm, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio, 
            usuario: {
                _id: usuario
            }, 
            marca: {
                _id: marca
            },
            tipoEquipo: {
                _id: tipo
            },
            estadoEquipo: {
                _id: estado
            }
        }
        console.log(inventario)
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await crearInventario(inventario);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarInventarios();
        } catch (error) {
            console.log(error)
            Swal.close();
        }
    }

  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nuevo Inventario</h3>
                        <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <hr></hr>
                </div>
            </div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Serial</label>
                            <input type="text" name="serial" value={serial} required onChange={ (e) => handleOnChange(e)} minLength={3} className="form-control"/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Modelo</label>
                            <input type="text" name="modelo" value={modelo} required onChange={ (e) => handleOnChange(e)} minLength={3} className="form-control"/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input type="text" name="descripcion" value={descripcion} required onChange={ (e) => handleOnChange(e)} minLength={3} className="form-control"/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Color</label>
                            <input type="text" name="color" value={color} required onChange={ (e) => handleOnChange(e)} minLength={3} className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Foto</label>
                            <input type="url" name="foto" value={foto} required onChange={ (e) => handleOnChange(e)} className="form-control"/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Fecha compra</label>
                            <input type="date" name="fechaCompra" value={fechaCompra} required onChange={ (e) => handleOnChange(e)} className="form-control"/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input type="number" name="precio" value={precio} required onChange={ (e) => handleOnChange(e)} className="form-control"/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <select className="form-select" onChange={ (e) => handleOnChange(e)} name='usuario' value={usuario} required>
                                <option value=''>Seleccione</option>
                                {
                                    usuarios.map(({_id, nombre}) => {
                                        return <option key={_id} value={_id}>{nombre}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Marca</label>
                            <select className="form-select"  onChange={ (e) => handleOnChange(e)} name='marca' value={marca} required>
                                <option value=''>Seleccione</option>
                                {
                                    marcas.map(({_id, nombre}) => {
                                        return <option key={_id} value={_id}>{nombre}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Tipo Equipo</label>
                            <select className="form-select" onChange={ (e) => handleOnChange(e)} name='tipo' value={tipo} required>
                                <option value=''>Seleccione</option>
                                {
                                    tipos.map(({_id, nombre}) => {
                                        return <option key={_id} value={_id}>{nombre}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Estado Equipo</label>
                            <select className="form-select"  onChange={ (e) => handleOnChange(e)} name='estado' value={estado} required>
                                <option value=''>Seleccione</option>
                                {
                                    estados.map(({_id, nombre}) => {
                                        return <option key={_id} value={_id}>{nombre}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-success'>Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
