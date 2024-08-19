import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewPosts from '../components/ViewPosts';
import axios from 'axios';

jest.mock('axios');

describe('ViewPosts Component', () => {
    test('fetches and displays posts from API', async () => {
        const mockResponse = { data: [{ id: 1, title: 'Test Post', body: 'Test Body' }] };
        axios.get.mockResolvedValue(mockResponse);

        const { getByText } = render(<ViewPosts />);

        await waitFor(() => {
            expect(getByText(/Test Post/i)).toBeInTheDocument();
            expect(getByText(/Test Body/i)).toBeInTheDocument();
        });
    });

    test('handles empty posts array', async () => {
        axios.get.mockResolvedValue({ data: [] });

        const { getByText } = render(<ViewPosts />);

        await waitFor(() => {
            expect(getByText(/No posts available/i)).toBeInTheDocument();
        });
    });
});
