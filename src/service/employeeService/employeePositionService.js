import axios from 'axios';
import {baseUrl} from '../../config.json';

/**
 * trả về danh sách vị trí nhân viên
 * created by: Mạnh Tiến(28/1/2021)
 */
const getEmployeePositions = async () => {
    const res = await axios.get(baseUrl+'EmployeePosition');
    return res.data;
}

export default {
    getEmployeePositions
}