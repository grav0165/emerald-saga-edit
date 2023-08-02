import { useSelector} from 'react-redux';
import './StudentList.css';
import StudentDetail from '../StudentDetail/StudentDetail';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


function StudentList(props) {

    const studentList = useSelector(store => store.studentList);

    const loadingSpinner = useSelector(store => store.loadingSpinner)

  

    return loadingSpinner ?  (
        <LoadingSpinner /> 
    ) : 
    (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Cohort</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Github name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map(student => {
                        return <StudentDetail key={student.id} student={student} />
                    })}
                </tbody>
            </table>
        </div>
    );
    
}

export default StudentList;
