// AddPost.jsx
import React, { useState } from 'react';

const AddPost = ({ onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState(null);

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
            setMessage('Post submitted successfully!');
            onPostAdded(data); // Notify parent about the new post
        } catch (error) {
            console.error('Error posting data:', error);
            setMessage('Failed to submit the post.');
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
        </div>
    );
};

export default AddPost;
