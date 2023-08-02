import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function StudentDetail(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <tr>
      <td>{props.student.github_name}</td>
      <td><button>Edit</button></td>
    </tr>
  );
}

export default StudentDetail;
