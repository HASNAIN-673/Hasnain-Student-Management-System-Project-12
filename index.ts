#! /usr/bin/env node
 import inquirer from "inquirer";

// Define the Student class
class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 1000; // Set default balance to 1000
    }

    // Method to enroll a student in a course
    enroll_course(course: string) {
        this.courses.push(course);
    }

    // Method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }

    // Method to pay student fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} Fees Paid Successfully For ${this.name}`);
        console.log(`Remaining Balance For ${this.name}: $${this.balance}`);
    }

    // Method to display student status
    show_status() {
        console.log(`ID: ${this.id}`)
        console.log(`Name: ${this.name}`)
        console.log(`Courses: ${this.courses}`)
        console.log(`Balance: ${this.balance}`)
    }
}

// Define a student manager class to manage students
class Student_manager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    // Method to add a new Student
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student)
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`)
    }

    // Method to enroll a student in a course
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id)
        if (student) {
            student.enroll_course(course)
            console.log(`${student.name} Enrolled In ${course} Course Successfully`)
        }
    }

    // Method to view a student balance
    view_student_balance(student_id: number) {
        let student = this.find_student(student_id)
        if (student) {
            student.view_balance()
        } else {
            console.log("Student not found. Please Enter a Correct Student ID")
        }
    }

    // Method to pay student fees
    async pay_student_fees(student_id: number) {
        let student = this.find_student(student_id)
        if (student) {
            const { amount } = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: `Enter the Fees Amount for ${student.name}`,
                }
            ]);
            student.pay_fees(amount);
        } else {
            console.log("Student not found. Please Enter a Correct Student ID")
        }
    }

    // Method to display student status
    show_student_status(student_id: number) {
        let student = this.find_student(student_id)
        if (student) {
            student.show_status()
        } else {
            console.log("Student not found. Please Enter a Correct Student ID")
        }
    }

    // Method to find a student by student_id
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id)
    }
}

// Main function to run the program
async function main() {
    console.log("Welcome to MUHAMMAD HASNAIN - Student Management System")
    console.log("-".repeat(50))

    let student_manager = new Student_manager();

    // While loop to keep the program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ])

        // Using switch case to handle choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name)
                break;

            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name"
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course)
                break;

            case "View Student Balance":
                let view_balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(view_balance_input.student_id);
                break;

            case "Pay Fees":
                let pay_fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                await student_manager.pay_student_fees(pay_fees_input.student_id);
                break;

            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id)
                break;

            case "Exit":
                console.log("Exiting the Student Management System");
                process.exit(); // Terminate the program
                break;
        }
    }
}

main();

 