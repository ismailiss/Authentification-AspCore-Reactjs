import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useHistory } from 'react-router-dom';

export default function Deconnexion({token,setToken}) {
    const history = useHistory();
    
    const signout = () => {
        localStorage.removeItem("token");
        setToken(null)
        history.push('/Login');
    };

    return (
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} onClick={signout}>
            <LockOutlinedIcon />
        </Avatar>
    )
}
