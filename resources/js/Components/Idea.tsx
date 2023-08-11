import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { ExtendedIdea } from '@/types/extendedIdea';
import { Inertia } from '@inertiajs/inertia';
import CommentModal from './CommentModal';
import NewIdeaModal from './NewIdeaModal';

type IdeaProps = {
  idea: ExtendedIdea;
  auth: {
    user: {
      id: number;
      name: string;
    };
    token: string;
  } | null;
};

const Idea: React.FC<IdeaProps> = ({ idea, auth }) => {
  const [showCommentModal, setShowCommentModal] = useState(false); // State for showing comment modal
  const [showNewIdeaModal, setShowNewIdeaModal] = useState(false); // State for showing comment modal
  const [editingIdea, setEditingIdea] = useState<ExtendedIdea | null>(null); // Initialize with null

  const handleCommentShowModal = () => {
    setShowCommentModal(true);
  };  
 
  const handleUpvoteClick = async (ideaId: number) => {
    try {
      await Inertia.post(route('ideas.upvote', { idea: ideaId }));     
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (ideaId: number) => {
    try {
        await Inertia.delete(route('ideas.destroy', { idea: ideaId }));
    } catch (error) {
        console.error(error);
    }
};

  const handleEditClick = (idea: ExtendedIdea) => {
    setEditingIdea(idea); // Set the idea to be edited
    setShowNewIdeaModal(true); // Open the modal
  };
 
  return (
    <div className="idea-div p-3">
      <div className="card border border-warning">
        <div className="card-header d-flex justify-content-between p-3">
          <h4 className="fs-4 fw-bold">{idea.title}</h4>
          
        </div>
        <div className="card-body">
          <p className="card-text">{idea.content}</p>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          {auth && auth.user ? (
            <>
             {auth.user.id === idea.user_id && (
                  <>
                    <Link href="#" onClick={(e) => {
                      e.preventDefault(); // Prevent the default behavior
                      handleEditClick(idea);
                    }}>
                      <img src="/images/Edit-icon.png" alt="Edit" className="icon" width="20" height="20" />
                    </Link>
                    <Link href="#" onClick={(e) => {
                      e.preventDefault(); 
                      handleDeleteClick(idea.id)}} className="text-danger">
                      <img src="/images/delete-icon.jpg" alt="Delete" className="icon" width="20" height="20" />
                    </Link>
                  </>
                )}
              <div className="d-flex align-items-center">
                <Link href="#" onClick={(e) => {
                      e.preventDefault(); // Prevent the default behavior
                      handleUpvoteClick(idea.id);
                    } } >
                  <img src="/images/thumbs-up-icon.png" alt="Upvote" className="icon" width="20" height="20" />
                </Link>
                {idea.upvotes_count}
                <Link href="#" onClick={(e) => {
                            e.preventDefault();
                            handleCommentShowModal();
                }}>
                  <img src="/images/comment-icon.png" alt="Comment" className="icon" width="20" height="20" />
                </Link>
                {idea.comments_count}
              </div>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center">
                <img src="/images/thumbs-up-icon.png" alt="Upvote" className="icon" width="24" height="24" />
                {idea.upvotes_count}
                <img src="/images/comment-icon.png" alt="Comment" className="icon" width="24" height="24" />
                {idea.comments_count}
              </div>
            </>
          )}
          </div>
      </div>

      <CommentModal 
         show={showCommentModal} 
         onClose={() => setShowCommentModal(false)} 
         ideaId={idea.id}
         ideaTitle={idea.title}
      />
      <NewIdeaModal
        show={showNewIdeaModal}
        onClose={() => setShowNewIdeaModal(false)}
        ideaToEdit={editingIdea} // Pass the idea to edit
      />

    </div>
  );
};

export default Idea;
