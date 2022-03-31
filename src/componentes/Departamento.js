import React, {useEffect, useState} from 'react';
import {FaPlus} from "react-icons/fa";
import produce from "immer";
import TooltipHover from "./template/TooltipHover";
import Empleado from "./Empleado";
import {EMPLEADOS} from "./constantes/Empleados";

const Departamento = () => {
    //------hooks------//
    const [departamentos, setDepartamentos] = useState([]);
    //------useEffect------//
    useEffect(() => {
        setDepartamentos(produce(departamentos, d => {
            d.forEach(dep => {
                let total = 0;
                total += parseInt(dep.manager.pago);
                dep.manager.empleados.forEach(emp => {
                    total += emp.pago
                    emp.empleados.forEach(subemp => total += subemp.pago);
                });
                dep.total = total;
            });
        }))
    }, [departamentos]);
    //------Funciones GUI------//
    const agregarDepartamento = () => {
        setDepartamentos(produce(departamentos, d => {
            d.push({nombre: '', total: 0, manager: {nombre: '', empleados: [], pago: 300}});
        }))
    }
    const agregarEmpleado = (idx) => {
        setDepartamentos(produce(departamentos, d => {
            d[idx].manager.empleados.push({tipo: '', pago: 0, empleados: []});
        }))
    }
    const agregarSubempleado = (idxDep, idxEmp) => {
        setDepartamentos(produce(departamentos, d => {
            d[idxDep].manager.empleados[idxEmp].empleados.push({tipo: '', pago: 0});
        }))
    }
    const actualizaSubempleado = (e, idx, idxEmp, idxSubEmp) => {
        setDepartamentos(produce(departamentos, d => {
            d[idx].manager.empleados[idxEmp].empleados[idxSubEmp].nombre = e.nombre;
            d[idx].manager.empleados[idxEmp].empleados[idxSubEmp].pago = e.pago;
        }))
    }
    const actualizaEmpleado = (e, idx, idxEmp) => {
        setDepartamentos(produce(departamentos, d => {
            d[idx].manager.empleados[idxEmp].nombre = e.nombre;
            d[idx].manager.empleados[idxEmp].pago = e.pago;
        }))
    }
    //------render------//
    return (
        <div>
            <div>
                <div className="d-flex d-inline-flex mt-2">
                    <h3>Agregar departamento</h3>
                    <div className="ms-2">
                        <button className="btn btn-outline-info p-1" onClick={() => agregarDepartamento()}><FaPlus/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-2">
                {(departamentos || []).map((dep, idx) =>
                    <div key={idx} className="me-2">
                        <div className="card p-2">
                            <div className="d-flex justify-content-start">
                                <label htmlFor="departamento">Nombre del departamento:</label>
                                <input value={dep.nombre}
                                       id="departamento"
                                       onChange={e => setDepartamentos(produce(departamentos, d => {
                                           d[idx].nombre = e.target.value;
                                       }))}/>
                            </div>
                            <div className="mt-1">
                                <div className="d-flex justify-content-start">
                                    <label htmlFor="departamento">Nombre manager:</label>
                                    <input value={dep.manager.nombre}
                                           className="me-2"
                                           onChange={e => setDepartamentos(produce(departamentos, d => {
                                               d[idx].manager.nombre = e.target.value;
                                           }))}/>
                                    <div className="me-2">${dep.manager.pago}</div>
                                    <div>
                                        <TooltipHover texto="Agregar empleado">
                                            <button className="btn btn-outline-info p-0"
                                                    onClick={() => agregarEmpleado(idx)}><FaPlus/></button>
                                        </TooltipHover>
                                    </div>
                                </div>
                                {(dep.manager.empleados || []).map((emp, idxEmp) =>
                                    <div key={idxEmp}>
                                        <Empleado obj={emp} onChange={e => actualizaEmpleado(e, idx, idxEmp)}
                                                  catalogo={EMPLEADOS}
                                                  agregarEmpleado={() => agregarSubempleado(idx, idxEmp)}/>
                                        {emp.empleados.map((subemp, idxSubEmp) =>
                                            <Empleado key={idxSubEmp} obj={subemp}
                                                      onChange={e => actualizaSubempleado(e, idx, idxEmp, idxSubEmp)}
                                                      catalogo={EMPLEADOS}/>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div>Total: ${dep.total}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Departamento;
