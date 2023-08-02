import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

function EditForm() {
    // Store holding student you want to edit's information
    const studentToEdit = useSelector(store => store.studentToEdit)

    // Bringing in dispatch to use
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (event, propertyToChange) => {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: propertyToChange,
                value: event.target.value
            }
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Dispatch an action that is being listened for by a saga
        dispatch({
            type: 'SUBMIT_EDIT_STUDENT',
            payload: studentToEdit
        })
        history.push('/')
    }

    const cancelEdit = () => {
        history.push('/')
    }

    return (
        <>
            <div>Edit form</div>
            <form>
                <input
                    value={studentToEdit.cohort}
                    placeholder="cohort"
                    onChange={(event) => handleChange(event, 'cohort')}
                />
                <input
                    value={studentToEdit.first_name}
                    placeholder="First Name"
                    onChange={(event) => handleChange(event, 'first_name')}
                />
                <input
                    value={studentToEdit.last_name}
                    placeholder="Last Name"
                    onChange={(event) => handleChange(event, 'last_name')}
                />
                <input
                    value={studentToEdit.github_name}
                    placeholder="GitHub name"
                    onChange={(event) => handleChange(event, 'github')}
                />
                <button type='submit' onClick={()=>handleSubmit(event)}>Update Student</button>
                <button onClick={cancelEdit}>Cancel</button>
            </form>
        </>
    )
}

export default EditForm;