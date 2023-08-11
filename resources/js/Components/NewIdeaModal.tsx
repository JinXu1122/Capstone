import React, { useState, useEffect  } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Modal, Button, Form } from 'react-bootstrap';
import { ExtendedIdea } from '@/types/extendedIdea';

type NewIdeaModalProps = {
  show: boolean;
  onClose: () => void;
  ideaToEdit?: ExtendedIdea | null; // Add this prop
};

const NewIdeaModal: React.FC<NewIdeaModalProps> = ({ show, onClose, ideaToEdit }) => {
  const [ideaForm, setIdeaForm] = useState({
    title: '',
    content: '',
  });
 
  useEffect(() => {
    if (ideaToEdit) {
      // If an idea is provided, pre-fill the form with its data
      setIdeaForm({
        title: ideaToEdit.title,
        content: ideaToEdit.content,
      });
    }
  }, [ideaToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (ideaToEdit) {
        // Edit mode: Update existing idea
        await Inertia.put(route('ideas.update', { idea: ideaToEdit.id }), ideaForm);
      } else {
        // Create mode: Create a new idea
        await Inertia.post(route('ideas.store'), ideaForm);
      }

      onClose();
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
   
    <Modal show={show} onHide={onClose}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Title: {ideaTitle}</Modal.Title>        
      </Modal.Header> */}
      <div className="modal-header">
        <Modal.Title>{ideaToEdit ? 'Edit Idea' : 'New Idea'}</Modal.Title>
        <button type="button" className="btn close" aria-label="Close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
      </div>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="idea">
            <Form.Label>Title</Form.Label>
            <Form.Control
              as="input"
              value={ideaForm.title}
              onChange={(e) => setIdeaForm({ ...ideaForm, title: e.target.value })}
              required
            />            
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={ideaForm.content}
              onChange={(e) => setIdeaForm({ ...ideaForm, content: e.target.value })}
              required
            />                     
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" style={{ backgroundColor: '#0561F5' }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewIdeaModal;

