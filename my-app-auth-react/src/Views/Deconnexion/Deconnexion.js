import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUserRequest } from "../../store/actionCreators/auth";
import LogoutRoundedIcon from "@mui/icons-material/Logout";

function Deconnexion({ logoutUserRequest }) {
  const history = useHistory();

  const signout = () => {
    logoutUserRequest();
    history.push("/Login");
  };

  return (
    <>
      <MenuItem onClick={signout}>
        <ListItemIcon>
          <LogoutRoundedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </>

  );
}
const mapDispatchToProps = {
  logoutUserRequest,
};
export default connect(null, mapDispatchToProps)(Deconnexion);
