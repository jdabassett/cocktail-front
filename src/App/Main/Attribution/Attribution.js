import Modal from 'react-bootstrap/Modal';
// import image from '../../../images/'

export default function Attribution(props) {
  return (
    <Modal
      className="modal"
      show={props.stateApp.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Body
        className="modal-body">
        <Modal.Title 
          className="modal-title"
          id="contained-modal-title-vcenter">
          {`Artist: ${props.stateApp.artist.author}`}
          <a 
            target="_blank" rel="noreferrer"
            className="modal-link"
            href={props.stateApp.artist.link}>link</a>
        </Modal.Title>
        {props.stateApp.artist.image && <img 
          className="modal-image"
          src={require(`../../../images/${props.stateApp.artist.image}`)} 
          alt={props.stateApp.artist.link}/>}
      </Modal.Body>
    </Modal>
  );
}