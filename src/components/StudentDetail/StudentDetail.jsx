import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function StudentDetail(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  function handleEditClick() {
    // dispatch to store this student info in redux
    dispatch({ type: 'SET_STUDENT_TO_EDIT', payload: props.student });

    // route to EditForm
    history.push('/edit');
  }

  return (
    <tr>
      <td>{props.student.cohort}</td>
      <td>{props.student.first_name}</td>
      <td>{props.student.last_name}</td>
      <td>{props.student.github_name}</td>
      <td><button onClick={handleEditClick}>Edit</button></td>
    </tr>
  );
}

export default StudentDetail;