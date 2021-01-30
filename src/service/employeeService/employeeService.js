import axios from 'axios';
import {baseUrl} from '../../config.json';

/**
 * @param {any} email
 * vaidate email
 */
const isEmail = (email) => {
    var regex = /^([a-zA-Z0-9_.+-@])+(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/**
 * @param {any} employeeCode
 * @param {any} employeeName
 * @param {any} employeeIDCard
 * @param {any} email
 * @param {any} phoneNumber
 * validate required field
 */
const validate = (employee) => {
    if (!employee.EmployeeCode) {
        alert("Không được trống mã nhân viên");
        return false;
    }
    if (!employee.EmployeeName) {
        alert("Không được trống tên nhân viên");
        return false;
    }
    if (!employee.EmployeeIDCard) {
        alert("Không được trống số CMTND/thẻ căn cước nhân viên");
        return false;
    }
    if (!employee.Email) {
        alert("Không được trống email");
        return false;
    } else {
        if (!isEmail(employee.Email)) {
            alert("Không đúng định dạng email.");
            return false;
        }
    }
    if (!employee.PhoneNumber) {
        alert("Không được trống số điện thoại");
        return false;
    }
    return true;
}

/**
 * @param {number} page 
 * @param {number} limit 
 * 
 * trả về danh sách nhân viên
 * created by: Mạnh Tiến(28/1/2021)
 */
const getEmployees = async (page, limit) => {
    const res = await axios.get(baseUrl +'Employee/'+page+'/'+limit);
    return res.data;
}

/**
 * trả về tổng số lượng nhân viên
 * created by: Manh Tien(28/1/2021)
 */
const getNumberEmployees = async () => {
    const res = await axios.get(baseUrl+'Employee/'+'numberEntity');
    return res.data
}

const getEmployeeById = async (id) => {
    const res = await axios.get(baseUrl+'Employee/'+id);
    return res.data;
}

/**
 * đặt các ô input về trạng thái mặc định sau khi save
 * created by: Mạnh Tiến (29/1/2021)
 */

const reSetInputFiled = () => {
    var employee = {};
    employee.EmployeeId = null;
    employee.EmployeeCode = '';
    employee.EmployeeName = "";
    employee.DateOfBirth = null;
    employee.Gender = 0;
    employee.EmployeeIDCard = '';
    employee.DateOfIssueIDCard = null;
    employee.IssueBy = '';
    employee.Email = '';
    employee.PhoneNumber = '';
    employee.EmployeePositionId = null;
    employee.EmployeeDepartmentId = null;
    employee.EmployeeSalary = '';
    employee.EmployeeTaxCode = '';
    employee.DateOfJoiningCompany = '';
    employee.EmployeeSate = 0;
    return employee;
}
/**
 * lưu nhân viên nhân viên
 * trả về trạng thái sau khi lưu
 * created by: Manh Tien(28/12021)
 */
const saveEmployee = (employee) => {
    var result;
    if(validate(employee)){
        if(employee.EmployeeId == null){
            axios.post(baseUrl+'Employee', employee).then(res => {
                result = res.data;
            }
            );
        }
        else{
            axios.put(baseUrl+'Employee', employee).then( res => {
                result = res.data;
            })
        }
    }
    
    return result;
}

/**
 * @param {*} id 
 * @param {*} page 
 * @param {*} limit 
 * lấy danh sách nhân viên theo id của vị trí nhân viên
 * created by: Manh Tien(28/12021)
 */
const getEmployeesByPositionId = async (id, page, limit) => {
    const res = await axios.get(baseUrl+'Employee/position/'+id+'/'+page+'/'+limit);
    return res.data;
}

/**
 * @param {*} id 
 * @param {*} page 
 * @param {*} limit 
 * lấy dánh sách nhân viên theo id của bộ phận nhân viên
 * created by: Manh Tien(28/12021)
 */
const getEmployeesByDepartmentId = async (id, page, limit) => {
    const res = await axios.get(baseUrl+'Employee/department/'+id+'/'+page+'/'+limit);
    return res.data;
}

/**
 * @param {*} id 
 * @param {*} page 
 * @param {*} limit 
 * lấy dánh sách nhân viên theo id của bộ phận nhân viên và vị trí nhân viên
 * created by: Manh Tien(28/12021)
 */
const getEmployeesByPositionIdAndDepartmentId = async (positionId, departmentId, page, limit) => {
    const res = await axios.get(baseUrl+'Employee/'+positionId+'/'+departmentId+'/'+page+'/'+limit);
    return res.data;
}

/**
 * 
 * @param {*} key 
 * @param {*} page 
 * @param {*} limit 
 * lấy danh sách nhân viên theo keyWord
 * createdBy: Mạnh Tiến(30/1/2021)
 */
const getEmployeeByKey = async (key, page, limit) => {
    const res = await axios.get(baseUrl+'Employee/filter/'+key+'/'+page+'/'+limit);
    return res.data;
}

/**
 * @param {*} id 
 * lấy tổng số lượng nhân viên có cùng id vị trí
 * created by: Manh Tien(28/12021)
 */
const getNumberEmployeesByPositionId = async (id) => {
    const res = await axios.get(baseUrl+'Employee/'+'countEmployeeByPosiId/'+id);
    return res.data;
}

/**
 * @param {*} id 
 * lấy tổng số lượng nhân viên có cùng id vị trí
 * created by: Manh Tien(28/12021)
 */
const getNumberEmployeeByDepartmentId = async (id) => {
    const res = await axios.get(baseUrl+'Employee/'+'countEmployeeByDeparId/'+id);
    return res.data;
}

/**
 * @param {*} posiId 
 * @param {*} deparId 
 * lấy tổng số lượng nhân viên có cùng id vị trí
 * created by: Manh Tien(28/1/2021)
 */
const getNumberEmployeeByPosiIdAndDepartId = async (posiId, deparId) => {
    const res = await axios.get(baseUrl+'Employee/' +'countEmployeeByPosiIdAndDeparId/'+posiId+'/'+deparId);
    return res.data;
}

/**
 * 
 * @param {*} employeeName 
 * lấy số lượng nhân viên theo tên
 * created by: Mạnh Tiến(30/1/2021);
 */
const getNumberEmployeeByName = async (employeeName) => {
    const res = await axios.get(baseUrl+'Employee/numberEmployeeSearchByName/'+employeeName);
    return res.data;
}

export default {
    getEmployees,
    getNumberEmployees,
    saveEmployee,
    validate,
    getEmployeeById,
    reSetInputFiled,
    getEmployeesByPositionId,
    getEmployeesByDepartmentId,
    getEmployeesByPositionIdAndDepartmentId,
    getNumberEmployeesByPositionId,
    getNumberEmployeeByDepartmentId,
    getNumberEmployeeByPosiIdAndDepartId,
    getEmployeeByKey,
    getNumberEmployeeByName
}