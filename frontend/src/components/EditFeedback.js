import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        description: '',
        image: '',
        comments: [],  // Maintain comments as an array
        comment: ''  // For input handling
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setValues(v => ({ ...v, image: reader.result }));
        };
        reader.onerror = (error) => {
            console.error('Error loading image:', error);
        };
    };

    useEffect(() => {
        axios.get(`http://localhost:8070/feedback/get/${id}`)
            .then(res => {
                const { description, image, comments } = res.data;  // Destructure response data
                setValues({ description, image, comments: comments || [], comment: '' });
            })
            .catch(err => {
                console.error('Error fetching feedback:', err);
                navigate('/error'); // Redirect or handle error
            });
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/feedback/update/${id}`, values)
            .then(() => {
                navigate('/'); // Navigate to home page after update
            })
            .catch(err => {
                console.error('Error updating feedback:', err);
            });
    };

    const deleteFeedback = () => {
        axios.delete(`http://localhost:8070/feedback/delete/${id}`)
            .then(() => {
                alert('Feedback Deleted Successfully');
                navigate('/'); // Navigate to home page after deletion
            })
            .catch(err => {
                console.error('Error deleting feedback:', err);
            });
    };

    const addComment = () => {
        axios.post(`http://localhost:8070/feedback/add-comment/${id}`, { comment: values.comment })
            .then(() => {
                alert("Comment Added Successfully");
                setValues(v => ({
                    ...v,
                    comments: [...v.comments, values.comment],
                    comment: ''
                }));  // Reset input and update comment list
            })
            .catch((err) => {
                console.error('Failed to add comment:', err);
                alert("Failed to add comment");
            });
    };

    return (
        <div className='container'>
            <h1>Update Feedback</h1><br/>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[240px]">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control border border-gray-300 rounded-md shadow-sm p-2 w-full"
                            id="description"
                            placeholder='Description'
                            value={values.description}
                            onChange={(e) => setValues({...values, description: e.target.value})}
                            required
                        />
                    </div>
                    <div className="flex-1 min-w-[240px]">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type='file'
                            className="form-control block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            id="image"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">Update</button>
                    <button type="button" onClick={deleteFeedback} className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-700">Delete</button>
                </div>
                {values.image && (
                    <div className="w-full flex justify-center py-4">
                        <img src={values.image} alt="Uploaded" style={{ maxWidth: '500px' }} />
                    </div>
                )}
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input
                        type="text"
                        className="form-control border border-gray-300 rounded-md shadow-sm p-2 w-full"
                        id="comment"
                        placeholder='Add a comment'
                        value={values.comment}
                        onChange={(e) => setValues({...values, comment: e.target.value})}
                    />
                    <button type="button" onClick={addComment} className="mt-2 px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-700">Add Comment</button>
                </div>
                <div>
                    {values.comments.map((comment, index) => (
                        <p key={index}>{comment}</p>  // Display each comment
                    ))}
                </div>
            </form>
        </div>
    );
}

export default Update;
