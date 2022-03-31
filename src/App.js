import './App.css';
import {FaPlus} from "react-icons/fa";
import {useEffect, useState} from "react";
import produce from "immer";
import TooltipHover from "./componentes/template/TooltipHover";
import Select from "./componentes/template/Select";

const EMPLEADOS = [
    {id: 1, nombre: 'Developer', pago: 1000},
    {id: 2, nombre: 'QA Tester', pago: 500},
    {id: 3, nombre: 'Manager', pago: 300},
];

function App() {
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
    }, [departamentos])
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
    return (
        <div className="App">
            <div>
                <div className="d-flex d-inline-flex">
                    <h3>Agregar departamento</h3>
                    <button className="btn btn-outline-info" onClick={() => agregarDepartamento()}><FaPlus/></button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {(departamentos || []).map((dep, idx) =>
                    <div key={idx} className="me-2">
                        <div className="card p-2">
                            <div>
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
                                           onChange={e => setDepartamentos(produce(departamentos, d => {
                                               d[idx].manager.nombre = e.target.value;
                                           }))}/>
                                    <div>${dep.manager.pago}</div>
                                    <div>
                                        <TooltipHover texto="Agregar empleado">
                                            <button className="btn btn-outline-info p-0"
                                                    onClick={() => agregarEmpleado(idx)}><FaPlus/></button>
                                        </TooltipHover>
                                    </div>
                                </div>
                                {(dep.manager.empleados || []).map((emp, idxEmp) =>
                                    <div key={idxEmp}>
                                        <div className="d-flex justify-content-start">
                                            <div className='ms-5'> </div>
                                            <Select selected={emp.nombre}
                                                    className="form-select-sm"
                                                    options={EMPLEADOS}
                                                    idKey='nombre'
                                                    onSelect={e => setDepartamentos(produce(departamentos, d => {
                                                        d[idx].manager.empleados[idxEmp].nombre = e.nombre;
                                                        d[idx].manager.empleados[idxEmp].pago = e.pago;
                                                    }))}
                                            />
                                            <div>${emp.pago}</div>
                                            {emp.nombre === 'Manager' &&
                                            <button className="btn btn-outline-info p-0"
                                                    onClick={() => agregarSubempleado(idx, idxEmp)}><FaPlus/></button>
                                            }
                                        </div>
                                        {emp.empleados.map((subemp, idxSubEmp) =>
                                            <div className="d-flex justify-content-start ms-5" key={idxSubEmp}>
                                                <div className='ms-5'> </div>
                                                <Select selected={subemp.nombre}
                                                        options={EMPLEADOS}
                                                        className={`form-select-sm`}
                                                        idKey='nombre'
                                                        onSelect={e => setDepartamentos(produce(departamentos, d => {
                                                            d[idx].manager.empleados[idxEmp].empleados[idxSubEmp].nombre = e.nombre;
                                                            d[idx].manager.empleados[idxEmp].empleados[idxSubEmp].pago = e.pago;
                                                        }))}
                                                />
                                                <div>${subemp.pago}</div>
                                            </div>
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
}

export default App;
