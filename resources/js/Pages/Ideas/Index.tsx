import React from 'react';
import IndexLayout from '@/Layouts/IndexLayout';
import Idea from '@/Components/Idea';
import { ExtendedIdea } from '@/types/extendedIdea';
import { Head, Link, usePage } from '@inertiajs/inertia-react';

type IndexProps = {
  ideas: ExtendedIdea[];
  auth: {
    user: {
      id: number;
      name: string;
    };
    token: string;
  } | null;
};

const Index: React.FC<IndexProps> = ({ ideas, auth}) => {  
  console.log("ideas: " + ideas);
  console.log("auth: " + auth);
  return (
        <IndexLayout title="Idea Forum" auth = {auth}>
            {ideas.map((idea) => (
                <Idea
                 key={idea.id} 
                 idea={idea} 
                 auth={auth}
                />
                ))}
        </IndexLayout>
  );
};

export default Index;


