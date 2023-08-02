import { useState } from 'react';
import { useDispatch } from 'react-redux';

/*
YOU SHOULDNT NEED TO MODIFY ANYTHING IN THIS FILE
*/

function StudentForm() {
    const dispatch = useDispatch();

    const [student, setStudent] = useState({ cohort: '', first_name: '', last_name: '', github_name: '' });

    // Called when the submit button is pressed
    const handleSubmit = (event) => {
        event.preventDefault();
        // Dispatch an action to trigger the addStudent saga
        dispatch({ type: 'ADD_STUDENT', payload: student })
        // Clear fields
        setStudent({ cohort: '', first_name: '', last_name: '', github_name: '' });
    }


    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(event) => setStudent({ ...student, cohort: event.target.value })}
                placeholder="Cohort"
                value={student.cohort}
            />
            <input onChange={(event) => setStudent({ ...student, first_name: event.target.value })}
                placeholder="First name"
                value={student.firstName}
            />
            <input onChange={(event) => setStudent({ ...student, last_name: event.target.value })}
                placeholder="Last name"
                value={student.lastName}
            />
            <input onChange={(event) => setStudent({ ...student, github_name: event.target.value })}
                placeholder="GitHub username"
                value={student.githubName}
            />
            <input type="submit" value="Add Student" />
        </form>
    );

}


export default StudentForm;
