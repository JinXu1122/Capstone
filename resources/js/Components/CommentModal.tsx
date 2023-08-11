import { ExtendedIdea } from '@/types/extendedIdea';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

type CommentModalProps = {
  show: boolean;
  onClose: () => void;
  ideaId: number; 
  ideaTitle: string;
};

const CommentModal: React.FC<CommentModalProps> = ({ show, onClose, ideaId, ideaTitle }) => { 
  const [commentForm, setCommentForm] = useState({
    content: ''
  }); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
        await Inertia.post(route('ideas.comment', { idea: ideaId}), commentForm);

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
            <Modal.Title>Title: {ideaTitle ? ideaTitle : 'No Idea Title'}</Modal.Title>            
            <button type="button" className="btn close" aria-label="Close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
        </div>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={commentForm.content}
              onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
              required
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit" style={{ backgroundColor: '#0561F5'}}>
            Add Comment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
