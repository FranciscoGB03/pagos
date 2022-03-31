import Select from "./template/Select";
import {FaPlus} from "react-icons/fa";

const Empleado = ({
                      obj,
                      catalogo,
                      onChange,
                      agregarEmpleado = () => {
                      }
                  }) => {
    return (
        <div className="d-flex justify-content-start ms-5 mt-1">
            <div className='ms-5'></div>
            <Select selected={obj.nombre}
                    options={catalogo}
                    className={`form-select-sm`}
                    idKey='nombre'
                    onSelect={onChange}
            />
            <div className="me-2">${obj.pago}</div>
            {obj.nombre === 'Manager' &&
            <div>
                <button className="btn btn-outline-info p-0"
                        onClick={() => agregarEmpleado()}><FaPlus/></button>
            </div>
            }
        </div>
    );
}
export default Empleado;
