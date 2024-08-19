
import React from 'react';

const DeletePost = ({ postId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE',
            });
            onDelete(postId); // Notify parent about the deletion
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <button onClick={handleDelete}>Delete Post</button>
    );
};

export default DeletePost;
