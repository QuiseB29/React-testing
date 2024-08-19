import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeletePost from '../components/DeletePosts';
import axios from 'axios';
import fetch from 'node-fetch';


global.fetch = fetch;

jest.mock('axios');

describe('DeletePost Component', () => {
    test('deletes a post and updates the UI', async () => {
        const mockResponse = { data: [{ id: 1, title: 'Test Post', body: 'Test Body' }] };
        axios.get.mockResolvedValue(mockResponse);

        const { getByText } = render(<DeletePost />);
        
        fireEvent.click(getByText(/Delete/i));

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
            expect(getByText(/Post deleted successfully/i)).toBeInTheDocument();
        });
    });
});
