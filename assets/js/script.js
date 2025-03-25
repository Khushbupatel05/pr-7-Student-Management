
class Student {
    constructor(firstName, lastName, grid, contactNo, emailId, course, gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.grid = grid;
        this.contactNo = contactNo;
        this.emailId = emailId;
        this.course = course;
        this.gender = gender;
    }
}


class StudentManage {
    constructor() {
        this.students = [];
    }


    create(student) {
        this.students.push(student);
        this.display();
    }

    display() {
        const table = document.getElementById("studentTable");
        table.innerHTML = "";

        this.students.forEach((student, index) => {
            let row = `
                <tr class="text-center">
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.grid}</td>
                    <td>${student.contactNo}</td>
                    <td>${student.emailId}</td>
                    <td>${student.course}</td>
                    <td>${student.gender}</td>
                    <td class="p-2">
                        <button class="btn btn-primary btn-sm" onclick="updateStudent(${index})">✏️</button>
                    </td>
                    <td class="p-2">
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">🗑️</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });
    }

    update(index, updatedStudent) {
        this.students[index] = updatedStudent;
        this.display();
    }

    
    delete(index) {
        this.students.splice(index, 1);
        this.display();
    }
}

const manage = new StudentManage();
let updateIndex = null;


function createUpdateStudent() {
    const firstName = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const grid = document.getElementById("grid").value.trim();
    const contactNo = document.getElementById("phoneno").value.trim();
    const emailId = document.getElementById("mail").value.trim();
    const course = document.getElementById("course-select").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";

    
    
    const contactNoRegex = /^\d{10}$/;   
    const gridRegex = /^\d{4}$/;         
    
    
    if (!firstName) {
        Swal.fire("Validation Error", "Please enter your first name!", "error");
        return;
    }

    if (!lastName) {
        Swal.fire("Validation Error", "Please enter your last name!", "error");
        return;
    }
    
    if (!gridRegex.test(grid)) {
        Swal.fire({
            text: "Enter A Valid GRID Number (4-digits) !",
            icon: "error"
        });
        return;
    }
    
    if (!contactNoRegex.test(contactNo)) {
        Swal.fire({
            text: "Enter A Valid Contact Number (10-digits) !",
            icon: "error"
        });
        return;
    }
    
    if (!emailId) {
        Swal.fire("Validation Error", "Please enter your email ID!", "error");
        return;
    }
    
    if (!course) {
        Swal.fire("Validation Error", "Please select a course!", "error");
        return;
    }
    
    if (!gender) {
        Swal.fire("Validation Error", "Please select a gender!", "error");
        return;
    }
    // if(manage.students.some((record)=>{
    //     return record.emailId === emailId 
    // })){
    //     Swal.fire("Validation Error", "  invalid email!", "error");
    //     return;
    // }
    // if(manage.students.some((record)=>{
    //     return record.grid === grid
    // })){
    //     Swal.fire("Validation Error", " invalid grid!", "error");
    //     return;
    // }
    
    const student = new Student(firstName, lastName, grid, contactNo, emailId, course, gender);

    if (updateIndex === null) {
        manage.create(student);
        Swal.fire("Success", "Student added successfully!", "success");
    } else {
        manage.update(updateIndex, student);
        updateIndex = null;
        document.getElementById("submit").textContent = "Submit";
        Swal.fire("Success", "Student updated successfully!", "success");
    }

    resetForm();
}
function deleteStudent(idx){
    manage.delete(idx);
    Swal.fire("Deleted!", "Student has been deleted.", "success");
}



function resetForm() {
    document.getElementById("stu-form").reset();
}

function updateStudent(index) {
    const student = manage.students[index];

    document.getElementById("firstname").value = student.firstName;
    document.getElementById("lastname").value = student.lastName;
    document.getElementById("grid").value = student.grid;
    document.getElementById("phoneno").value = student.contactNo;
    document.getElementById("mail").value = student.emailId;
    document.getElementById("course-select").value = student.course;
    document.querySelector(`input[value="${student.gender}"]`).checked = true;

    updateIndex = index;
    document.getElementById("submit").textContent = "Update";
}


document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    createUpdateStudent();
});
