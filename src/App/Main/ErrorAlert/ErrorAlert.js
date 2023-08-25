
import Alert from 'react-bootstrap/Alert';

function ErrorAlert(props) {

  return (
    <Alert variant="danger" onClose={() => props.dispatch({type:'updateError',payload:{value:{bool:false,message:""}}})} dismissible>
        <Alert.Heading>{`Error: ${props.state.message}`}</Alert.Heading>
      </Alert>
  )
}

export default ErrorAlert;