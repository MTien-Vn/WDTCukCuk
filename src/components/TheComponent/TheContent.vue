<template>
    <div class="content">
        <div class="content-header">
            <div class="title">Danh sách nhân viên</div>
            <div class="add-customes" 
                v-on:click="handleShowForm">
                <BaseButton
                text="Thêm nhân viên" 
                :class="{btn_add:true}"/>
            </div>

            <EmployeeForm :isHide="isHideForm" 
                           @closeForm="handleCloseForm"
                           :employeeProp="employee"/>
            <BasePopUp :isActive="isHidePopUp" 
                        @cancel="handleClosePopUp"
                        @confirm="handleConfirm"/>
        </div>

        <div class="filter-bar">
            <div class="filter-left">
                <div class="filter" title="Tìm kiếm theo mã, Tên khách hàng hoặc số điện thoại">
                    <input id="searching" class="input-search icon-search" 
                            placeholder="Tìm kiếm theo mã, Tên nhân viên hoặc số điện thoại" 
                            v-model="keyWord"
                            v-on:keyup.enter="handleSearch(keyWord)"/>
                </div>
                <div class="filter">
                    <select id="all-department" v-model="employeeDepartmentId" @change="getDepartmentId(employeeDepartmentId)">
                        <option value="">Tất cả phòng ban</option>
                        <option v-for="employeeDepartment in employeeDepartmentList"
                                 :key="employeeDepartment.EmployeeDepartmentId"
                                 :value="employeeDepartment.EmployeeDepartmentId"
                        >{{employeeDepartment.EmployeeDepartmentName}}</option>
                    </select>
                </div>
                <div class="filter">
                    <select id="all-position" v-model="employeePositionId" @change="getPositionId(employeePositionId)">
                        <option value="">Tất cả vị trí</option>
                        <option v-for="employeePosition in employeePositionList"
                                :key="employeePosition.EmployeePositionId"
                                :value="employeePosition.EmployeePositionId"
                        >{{employeePosition.EmployeePositionName}}</option>
                    </select>
                </div>
            </div>

            <div class="filter-right">
                <button id="fresh-data" class="btn-refresh icon-refresh" style="position: absolute; right: 0;" title="tải lại dữ liệu trang"></button>
            </div>
        </div>

        <div class="content-body">
            <div class="grid">
                <table id="tbListData">
                    <thead>
                        <tr>
                            <th fieldName="EmployeeCode">Mã nhân viên</th>
                            <th fieldName="EmployeeName">Họ và tên</th>
                            <th fieldName="Gender" formatType="gender">Giới tính</th>
                            <th fieldName="DateOfBirth" formatType="ddmmyyyy" style="text-align:center">Ngày sinh</th>
                            <th fieldName="PhoneNumber">Điện thoại</th>
                            <th fieldName="Email">Email</th>
                            <th fieldName="EmployeePositionName">Chức vụ</th>
                            <th fieldName="EmployeeDepartmentName">Phòng ban</th>
                            <th fieldName="EmployeeSalary" formatType="money" class="text-align-right">Mức lương cơ bản</th>
                            <th fieldName="EmployeeSate" formatType="state">Tình trạng công việc</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employeeList"
                            :key="employee.EmployeeId"
                            v-on:click="updateEmployee(employee.EmployeeId)">
                            <td>
                            <div class="cell">{{ employee.EmployeeCode }}</div>
                            </td>
                            <td>
                            <div class="cell">{{ employee.EmployeeName }}</div>
                            </td>
                            <td>
                            <div class="cell">{{handleGender(employee.Gender)}}</div>
                            </td>
                            <td>
                            <div class="cell text_align_center">{{handleDate(employee.DateOfBirth)}}</div>
                            </td>
                            <td>
                            <div class="cell">{{ employee.PhoneNumber }}</div>
                            </td>
                            <td>
                            <div class="cell">{{ employee.Email }}</div>
                            </td>
                            <td>
                            <div class="cell">{{ employee.EmployeePositionName }}</div>
                            </td>
                            <td>
                            <div class="cell">{{ employee.EmployeeDepartmentName }}</div>
                            </td>
                            <td>
                            <div class="cell text_align_right">{{handleMoney(employee.EmployeeSalary)}}</div>
                            </td>
                            <td>
                            <div class="cell">{{handleState(employee.EmployeeSate)}}    </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <BasePaging objectName="Nhân Viên"
            :totalEmployee="total" 
            :totalPage="total_page"
            :currentPage="page"
            :limmitPage="limmit"
            @handleChangPage="handleChangePage"
            @handleChangeLimit="handleChangeLimit"
        />
    </div>
</template>

<script>
import BasePaging from '../BaseComponent/BasePaging';
import BaseButton from '../BaseComponent/BaseButton'
import EmployeeForm from '../../view/employee/EmployeeForm.vue';
import BasePopUp from '../../components/BaseComponent/BasePopUp';
import employeeService from '../../service/employeeService/employeeService';
import employeePositionService from '../../service/employeeService/employeePositionService';
import employeeDepartmentService from '../../service/employeeService/employeeDepartmentService';
export default {
    name: 'TheContent',
    components: { 
        BasePaging,
        BaseButton,
        EmployeeForm,
        BasePopUp
    },
    data() {
        return {
            isHideForm: true,
            isHidePopUp: true,
            employeePositionList: [],
            employeeDepartmentList: [],
            employeeList: [],
            employee: {},
            employeePositionId: '',
            employeeDepartmentId: '',
            keyWord: '',
            page: 1,
            limmit: 10,
            total: 0,
            total_page: 0,
        }
    },
    methods:{
        handleShowForm() {
            this.isHideForm = false;
        },
        
        handleClosePopUp(res){
            this.isHidePopUp = res;
        },

        handleConfirm(res){
            this.isHidePopUp = res;
        },
        handleCloseForm(a){
            this.isHideForm = a;
            this.employee = employeeService.reSetInputFiled();
        },
        
        handleDate(d){
            var date = new Date(d);
            var year = ("0000" + date.getFullYear()).slice(-4);
            var day = ("0" + date.getDate()).slice(-2);
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            return day + '/' + month + '/' + year;
        },

        handleMoney(money){
            if(money){
                var num = parseFloat(money);
                return new Intl.NumberFormat().format(num);
            }
            return "";
        },

        handleGender(genderCode){
            switch (genderCode) {
                case 0:
                    return "Nữ";
                case 1:
                    return "Nam";
                case 2:
                    return "Khác";
            }
        },

        handleState(state){
            switch (state) {
                case 0:
                    return "Làm việc";
                case 1:
                    return "Nghỉ việc";
                case 2:
                    return "Thử việc";
                case 3:
                    return "Nghỉ hưu";
            }
        },

        async updateEmployee(employeeId){
            this.isHideForm = false;
            this.employee = await employeeService.getEmployeeById(employeeId);

        },

        async handleFilter(posiId, deparId){
            if(posiId == '' && deparId == ''){
                this.employeeList = await employeeService.getEmployees(this.page, this.limmit);
                this.page = 1;
                this.total = await employeeService.getNumberEmployees();
                this.total_page = Math.ceil(this.total / this.limmit);
            }else if(posiId != '' && deparId == ''){
                this.employeeList = await employeeService.getEmployeesByPositionId(posiId, this.page, this.limmit);
                this.page = 1;
                this.total = await employeeService.getNumberEmployeesByPositionId(posiId);
                this.total_page = Math.ceil(this.total / this.limmit);
            }else if(posiId == '' && deparId != ''){
                this.employeeList = await employeeService.getEmployeesByDepartmentId(deparId, this.page, this.limmit);
                this.page = 1;
                this.total = await employeeService.getNumberEmployeeByDepartmentId(deparId);
                this.total_page = Math.ceil(this.total / this.limmit);
            }else{
                this.employeeList = await employeeService.getEmployeesByPositionIdAndDepartmentId(posiId, deparId, this.page, this.limmit);
                this.page = 1;
                this.total = await employeeService.getNumberEmployeeByPosiIdAndDepartId(posiId, deparId);
                this.total_page = Math.ceil(this.total / this.limmit);
            }
        },

        async handleSearch(keyWord){
            if(keyWord == ''){
                alert("key word không được trống");
            }
            else{
                this.employeeList = await employeeService.getEmployeeByKey(keyWord, this.page, this.limmit);
                this.page = 1;
            }
        },

        handleChangePage(page){
            this.page = page;
            if(this.keyWord != ''){
                this.handleSearch(this.keyWord);
            }
            this.handleFilter(this.employeePositionId, this.employeeDepartmentId);
        },

        handleChangeLimit(limit){
            this.limmit = Number(limit);
            if(this.keyWord != ''){
                this.handleSearch(this.keyWord);
            }
            this.handleFilter(this.employeePositionId, this.employeeDepartmentId);
        },


        getDepartmentId(id){
            this.keyWord = '';
            this.employeeDepartmentId = id;
            this.handleFilter(this.employeePositionId, this.employeeDepartmentId);
        },

        getPositionId(id){
            this.keyWord = '';
            this.employeePositionId = id;
            this.handleFilter(this.employeePositionId, this.employeeDepartmentId);
        }
    },
    computed:{

    },
    async created(){
        this.employeeList = await employeeService.getEmployees(this.page, this.limmit);
        this.employeePositionList = await employeePositionService.getEmployeePositions();
        this.employeeDepartmentList = await employeeDepartmentService.getEmployeeDepartments();
        //////
        const resNum = await employeeService.getNumberEmployees();
        this.total = resNum;
        var result = this.total / this.limmit;
        this.total_page = Math.ceil(result);
    }
}
</script>

<style scoped>
.btn_add{
    position: absolute; right: 0;margin-right: 0px;
}

.text_align_right{
    text-align: right;
}

.text_align_center{
    text-align: center;
}
</style>

