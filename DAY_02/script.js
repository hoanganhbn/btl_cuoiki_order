class Student {
    constructor(code, name, gender, dob, hometown) {
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.init();
    }

    init() {
        this.renderTable();
        document.getElementById('add-student-btn').addEventListener('click', () => this.showForm());
        document.getElementById('student-form').addEventListener('submit', (e) => this.saveStudent(e));
        document.querySelector('.close-btn').addEventListener('click', () => this.hideForm());
    }

    renderTable() {
        const tbody = document.querySelector('#student-table tbody');
        tbody.innerHTML = '';
        this.students.forEach((student, index) => {
            const row = `<tr>
                <td>${student.code}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="studentManager.editStudent(${index})">Sửa</button>
                    <button onclick="studentManager.deleteStudent(${index})">Xóa</button>
                </td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });
        this.updateLocalStorage();
    }

    saveStudent(event) {
        event.preventDefault();
        const id = document.getElementById('student-id').value;
        const code = document.getElementById('student-code').value;
        const name = document.getElementById('student-name').value;
        const gender = document.getElementById('student-gender').value;
        const dob = document.getElementById('student-dob').value;
        const hometown = document.getElementById('student-hometown').value;

        if (id === '') {
            const newStudent = new Student(code, name, gender, dob, hometown);
            this.students.push(newStudent);
        } else {
            this.students[id] = new Student(code, name, gender, dob, hometown);
        }

        this.hideForm();
        this.renderTable();
    }

    showForm(student = null, index = null) {
        const formModal = document.getElementById('student-form-modal');
        formModal.style.display = 'block';
        if (student) {
            document.getElementById('student-id').value = index;
            document.getElementById('student-code').value = student.code;
            document.getElementById('student-name').value = student.name;
            document.getElementById('student-gender').value = student.gender;
            document.getElementById('student-dob').value = student.dob;
            document.getElementById('student-hometown').value = student.hometown;
        } else {
            document.getElementById('student-form').reset();
            document.getElementById('student-id').value = '';
        }
    }

    hideForm() {
        document.getElementById('student-form-modal').style.display = 'none';
    }

    editStudent(index) {
        const student = this.students[index];
        this.showForm(student, index);
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.renderTable();
    }

    updateLocalStorage() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }
}

const studentManager = new StudentManager();
