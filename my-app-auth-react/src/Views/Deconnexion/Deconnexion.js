import { Avatar } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUserRequest } from '../../store/actionCreators';

 function Deconnexion({logoutUserRequest}) {
    const history = useHistory();
    
    const signout = () => {
        logoutUserRequest();
        history.push('/Login');
    };

    return (
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} onClick={signout}>
            <LogoutRoundedIcon />
        </Avatar>
    )
}
const mapDispatchToProps = {
    logoutUserRequest,
  };
  export default connect(null, mapDispatchToProps)(Deconnexion);
  