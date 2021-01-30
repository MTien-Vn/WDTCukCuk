import axios from 'axios';
import {baseUrl} from '../../config.json';

/**
 * trả về danh sách vị trí nhân viên
 * created by: Mạnh Tiến(28/1/2021)
 */
const getEmployeeDepartments = async() => {
    const res = await axios.get(baseUrl+'EmployeeDepartment');
    return res.data;
}

export default {
    getEmployeeDepartments
}