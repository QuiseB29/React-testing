import React, { useState } from 'react';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState(null);
    const [submittedPosts, setSubmittedPosts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            body,
            userId: parseInt(userId, 10),
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            console.log(data);
            setMessage('Post submitted successfully!');
            setSubmittedPosts([...submittedPosts, data]); // Add the new post to the list
        } catch (error) {
            console.error('Error posting data:', error);
            setMessage('Failed to submit the post.');
        }
    };

    const handleDelete = async (postId) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE',
            });
            setMessage('Post deleted successfully!');
            setSubmittedPosts(submittedPosts.filter(post => post.id !== postId)); // Remove the deleted post from the list
        } catch (error) {
            console.error('Error deleting post:', error);
            setMessage('Failed to delete the post.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="body">Body</label>
                <input
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <label htmlFor="userId">User Id:</label>
                <input
                    id="userId"
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <button type="submit">Submit Post</button>

                {message && <p>{message}</p>}
            </form>

            {/* Display a list of all submitted posts */}
            <div style={{ marginTop: '20px' }}>
                <h3>Submitted Posts</h3>
                {submittedPosts.length === 0 ? (
                    <p>No posts submitted yet.</p>
                ) : (
                    <ul>
                        {submittedPosts.map(post => (
                            <li key={post.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                                <p><strong>ID:</strong> {post.id}</p>
                                <p><strong>Title:</strong> {post.title}</p>
                                <p><strong>Body:</strong> {post.body}</p>
                                <p><strong>User ID:</strong> {post.userId}</p>
                                <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PostForm;
