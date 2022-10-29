import React, { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';

export default function Capsule({capsule}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  
  return (
    <>
    {/* Card to display the capsules details */}
        <Card className="d-flex flex-row card justify-content-center" style={{ width: '10rem' }} onClick={handleShow}>
            <Card.Body>
                <Card.Title className="card-title bold yellow">{capsule.capsule_serial}</Card.Title>
                <Card.Text className="bold">
                {capsule.type}
                </Card.Text>
                <Card.Text className="bold">
                {capsule.status.toUpperCase()}
                </Card.Text>
            </Card.Body>
        </Card>
        {/* Modal to display the capsules details */}
        <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={"primaryModal"}
        keyboard={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
        >
        <Modal.Header closeButton>
          <Modal.Title><h3 className="justify-content-center">Details</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Serial : {capsule.capsule_serial}</p>
        <p>Details : {capsule.details}</p>
        <p>Landings: {capsule.landings}</p>
        <p>Resuse Count : {capsule.reuse_count}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
