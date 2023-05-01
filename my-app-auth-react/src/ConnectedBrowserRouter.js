import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

function ConnectedBrowserRouter({ isAuthenticated }){
return(
<BrowserRouter isAuthenticated={isAuthenticated}>
    
</BrowserRouter>
)
    
}

export default connect(mapStateToProps)(ConnectedBrowserRouter);