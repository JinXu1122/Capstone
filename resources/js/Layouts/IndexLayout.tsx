import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import NewIdeaModal from '@/Components/NewIdeaModal';

type IndexLayoutProps = {
  title: string;
  children: React.ReactNode;
  auth: {
    user: {
      id: number;
      name: string;
    };
    token: string;
  } | null;
};

const IndexLayout: React.FC<IndexLayoutProps> = ({ title, auth, children }) => {
  const [showNewIdeaModal, setShowNewIdeaModal] = useState(false); // State for showing new idea modal  

  return (
    <div className="container outer-div">
      <Head title={title} />
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col mb-3">
          <h1 className="display-4">
            <img src="./images/IDEA-Forum-Logo.png" alt="Logo" width="150" height="50" className="me-2"/>            
          </h1>
        </div>
        <div className="col d-flex justify-content-end">
          {auth && auth.user ? (
            <>
              <button
                className="btn btn-outline-secondary me-3"
                onClick={() => setShowNewIdeaModal(true)}
              >
                +
              </button>
              <form action="/logout" method="post">
                <button className="btn btn-outline-secondary" type="submit">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <a href="/register" className="btn btn-outline-secondary me-3">
                Register
              </a>
              <a href="/login" className="btn btn-outline-secondary">
                Login
              </a>
            </>
          )}
        </div>
      </div>
      <div className="row">
        {children}
      </div>

      {/* NewIdeaModal component */}
      <NewIdeaModal
        show={showNewIdeaModal}
        onClose={() => setShowNewIdeaModal(false)}
      />      
    </div>
  );
};

export default IndexLayout;
