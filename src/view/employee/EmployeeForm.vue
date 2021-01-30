<template>
<div>
    <div class="dialog" :class="{hideForm: isHide}">
        <div class="dialog-modal"></div>
        <div class="container">
            <div class="header-dialog">
                <div class="header-dialog-text">Thông tin nhân viên</div>
                <button id="btnClose" class="btn-close" v-on:click="handleCloseForm">X</button>
            </div>
            <div class="body-form">
                <div class="avatar">
                    <div class="avatar-pic"></div>
                    <div class="avartar-text">Vui lòng chọn ảnh có định dạng <br /> .jpg, .jpeg, .png, .gif</div>
                </div>
                <div class="content">
                    <div class="general-infor">A. THÔNG TIN CHUNG</div>
                    <div><input id="txtId" style="display: none" type="text" /></div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Mã nhân viên(<span class="require-charecter">*</span>)</label></div>
                            <input type="text" class="input-field" id="txtEmployeeCode" v-model="employee.EmployeeCode"/>
                        </div>
                        <div class="employee">
                            <div><label class="label">Họ và tên(<span class="require-charecter">*</span>)</label></div>
                            <input type="text" class="input-field" id="txtFullName" v-model="employee.EmployeeName"/>
                        </div>
                    </div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Ngày sinh</label></div>
                            <input type="date" class="input-field" id="txtDOB" v-model="employee.DateOfBirth" />
                        </div>
                        <div class="employee">
                            <div><label class="label">Giới tính</label></div>
                            <select class="input-field" id="gender" v-model="employee.Gender">
                                <option value=1>Nam</option>
                                <option value=0>Nữ</option>
                                <option value=2>Khác</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Số CMTND/thẻ căn cước(<span class="require-charecter">*</span>)</label></div>
                            <input type="text" class="input-field" id="txtIdCardNumber" v-model="employee.EmployeeIDCard"/>
                        </div>
                        <div class="employee">
                            <div><label class="label">Ngày cấp</label></div>
                            <input type="date" class="input-field" id="txtIssueDate" v-model="employee.DateOfIssueIDCard"/>
                        </div>
                    </div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Nơi cấp</label></div>
                            <input type="text" class="input-field" id="txtIssuePlace" v-model="employee.IssueBy"/>
                        </div>
                        
                    </div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Email(<span class="require-charecter">*</span>)</label></div>
                            <input type="text" class="input-field" id="txteEmail" v-model="employee.Email"/>
                        </div>
                        <div class="employee">
                            <div><label class="label">Số điện thoại(<span class="require-charecter">*</span>)</label></div>
                            <input type="text" class="input-field" id="txtPhonenumber" v-model="employee.PhoneNumber"/>
                        </div>
                    </div>
                    <div class="work-infor">B. THÔNG TIN CÔNG VIỆC</div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Vị trí</label></div>
                            <select class="input-field" id="all-position-dialog" 
                                    v-model="employee.EmployeePositionId">
                                <option v-for="employeePosition in employeePositionList"
                                        :key="employeePosition.EmployeePositionId"
                                        :value="employeePosition.EmployeePositionId"
                                        >{{employeePosition.EmployeePositionName}}
                                </option>
                            </select>
                        </div>
                        <div class="employee">
                            <div><label class="label">Phòng ban</label></div>
                            <select class="input-field" id="all-department-dialog" 
                                    v-model="employee.EmployeeDepartmentId">
                                <option v-for="employeeDepartment in employeeDepartmentList"
                                        :key="employeeDepartment.EmployeeDepartmentId"
                                        :value="employeeDepartment.EmployeeDepartmentId">
                                        {{employeeDepartment.EmployeeDepartmentName}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Mã số thuế cá nhân</label></div>
                            <input type="text" class="input-field" id="txtEmployeeTaxCode" v-model="employee.EmployeeTaxCode"/>
                        </div>
                        <div class="employee">
                            <div><label class="label">Mức lương cơ bản</label></div>
                            <input type="text" class="input-field" id="txtSalary" v-model="employee.EmployeeSalary"/>
                        </div>
                    </div>
                    <div class="input-pair">
                        <div class="employee">
                            <div><label class="label">Ngày gia nhập công ty</label></div>
                            <input type="date" class="input-field" id="txtDOJ" v-model="employee.DateOfJoiningCompany" />
                        </div>
                        <div class="employee">
                            <div><label class="label">Tình trạng công việc</label></div>
                            <select class="input-field" id="stateWoring" v-model="employee.EmployeeSate">
                                <option value=0>Làm việc</option>
                                <option value=1>Nghỉ việc</option>
                                <option value=2>Thử việc</option>
                                <option value=3>Nghỉ hưu</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div class="footer-form">
                <button class="btn-cancel" id="cancel" v-on:click="handleCloseForm">Hủy</button>
                <button class="m-btn" id="saveEmployee" v-on:click="saveEmployee(employee)">
                    <div class="icon-save"></div>
                    <div class="save-text" >Lưu</div>
                </button>
            </div>
            <BasePopUp :isActive="isHidePopUp" 
                       textCancel="Hủy"
                       textConfirm="Đóng"
                       textHeader="Pop-up thông báo"
                       :textContent="popUpContent"
                @cancel="handleClosePopUp"
                @confirm="handleConfirm"/>
        </div>
    </div>
</div>
</template>

<script>
import employeeService from '../../service/employeeService/employeeService';
import employeeDepartmentService from '../../service/employeeService/employeeDepartmentService';
import employeePositionService from '../../service/employeeService/employeePositionService';
import BasePopUp from '../../components/BaseComponent/BasePopUp.vue';

export default {
  components: { BasePopUp },
    name: 'EmployeeForm',
    props:{
        isHide: Boolean,
        employeeProp: Object
    },
    data() {
        return {
            isHidePopUp: true,
            popUpContent: '',
            employee:{ },
            employeePositionList: [],
            employeeDepartmentList: []
        }
    },
    methods: {
        handleCloseForm(){
            //this.isHide = true;
            this.$emit('closeForm', true);
        },

        handleClosePopUp(res){
            this.isHidePopUp = res;
        },

        handleConfirm(res){
            this.isHidePopUp = res;
        },

        handleDate(data){
            var date = new Date(data);
            var day = ("0" + date.getDate()).slice(-2);
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var year = ("0000" + date.getFullYear()).slice(-4);
            return year + '-' + month + '-' + day;
        },
        
        saveEmployee(employee){
            var res = employeeService.saveEmployee(employee);
            this.employee = employeeService.reSetInputFiled()
            this.handleCloseForm();
            console.log(res);
            this.popUpContent = res.Messenger;
            this.isHidePopUp = false;
        }
    },

    async created(){
        this.employeePositionList = await employeePositionService.getEmployeePositions();
        this.employeeDepartmentList = await employeeDepartmentService.getEmployeeDepartments();

        
    },

    updated() {
        this.employee = this.employeeProp;
        if(this.employee.DateOfBirth != null){
            this.employee.DateOfBirth = this.handleDate(this.employee.DateOfBirth);
        }
        if(this.employee.DateOfJoiningCompany != null){
            this.employee.DateOfJoiningCompany = this.handleDate(this.employee.DateOfJoiningCompany);
        }
        if(this.employee.DateOfIssueIDCard != null){
            this.employee.DateOfIssueIDCard = this.handleDate(this.employee.DateOfIssueIDCard);
        }
    }
}
</script>

<style scoped>
.hideForm{
    display: none;
}
.dialog-modal {
    opacity: .5;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    z-index: 2;
}

.container {
    width: 700px;
    height: 700px;
    border: solid 1px rgb(66, 53, 53);
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: white;
    z-index: 3;
    margin-top: -350px;
    margin-left: -350px;
}

.pup-up-container {
    width: 400px;
    height: 250px;
    border: solid 1px rgb(66, 53, 53);
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: #ffffff;
    z-index: 10;
    margin-top: -150px;
    margin-left: -200px;
}

.header-dialog {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}

    .header-dialog .header-dialog-text {
        font-size: 20px;
        font-weight: bolder;
        padding-left: 16px;
    }

.body-form {
    height: calc(100% - 60px);
    padding: 10px;
}

.avatar {
    position: relative;
    float: left;
    width: 200px;
    height: auto;
}

    .avatar .avatar-pic {
        width: 120px;
        height: 120px;
        background-image: url('../../assets/content/img/default-avatar.jpg');
        padding-right: 24px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border: 1px solid black;
        margin-left: 24px;
    }

    .avatar .avartar-text {
        width: 100%;
        height: 80px;
        text-align: center;
    }
.body-form .content{
    width: calc(100% - 200px);
    left: 200px;
}

.input-pair{
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    margin-right: 8px;
}
    .input-pair .employee {
        border-radius: 4px;
        height: 40px;
        width: 100%;
        margin-left: 16px;
    }

.footer-form {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    display: flex;
    align-content: center;
    background-color: #bebebe;
    justify-content: flex-end;
}


.save-text {
    color: #ffffff;
    padding-left: 8px;
}

.require-charecter {
    color: red;
}

.label {
    padding: 4px;
    text-align: left;
}

.input-field {
    border-radius: 4px;
    height: 40px;
    width: 100%;
}



.general-infor, .work-infor{
    font-size: larger;
    font-weight: bold;
}

</style>