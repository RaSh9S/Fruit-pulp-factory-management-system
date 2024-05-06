import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const FormComponent = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getFeedback();
    }, []);

    useEffect(() => {
        setFilteredFeedback(feedback);
    }, [feedback]);

    const getFeedback = () => {
        axios.get("http://localhost:8070/feedback/")
            .then((res) => {
                setFeedback(res.data);
                setFilteredFeedback(res.data); // Initialize filteredFeedback with all feedback data
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSearch = () => {
        const filtered = feedback.filter(feedback =>
            feedback.description && feedback.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
        setFilteredFeedback(filtered);
    };

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error('Error: ', error);
        };
    };

    const sendData = (e) => {
        e.preventDefault();
        const newFeedback = {
            description,
            base64: image,
        };
        axios.post("http://localhost:8070/feedback/add", newFeedback)
            .then(() => {
                alert("Post Added");
                navigate('/');
                setDescription("");
                setImage(null);
                getFeedback();
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className='container'>
            <div className='bg-white'>
                <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-10'>COMMUNITY</h1>

                    <form onSubmit={sendData} className="flex flex-wrap items-center gap-4 p-4">
                        <div className="flex-1 min-w-[240px]">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                className="form-control border border-gray-300 rounded-md shadow-sm p-2 w-full"
                                id="description"
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex-1 min-w-[240px]">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Receipt</label>
                            <input
                                accept='image/*'
                                type='file'
                                onChange={convertToBase64}
                                className="form-control block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                "
                            />
                        </div>
                        {image && (
                            <div className="flex-1 min-w-[100px]">
                                <img src={image} alt="Uploaded" className="w-24 h-24 rounded-md shadow-sm" />
                            </div>
                        )}
                        <button type="submit" className="shrink-0 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">Submit</button>
                    </form>
                    <br />
                    <div className='flex justify-end space-x-2 mb-6'>
                        <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type='text'
                            name='search'
                            placeholder='Search'
                            className='form-control border-2 border-gray-300 rounded-md py-2 px-4'
                        />
                        <button onClick={handleSearch} className='btn btn-primary bg-blue-500 text-white rounded-md px-4 py-2'>Search</button>
                    </div>

                    {noResults ? (
                        <div className='text-center'>
                            <p className='text-lg text-gray-500'>No Details</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                            {filteredFeedback.map((item) => (
                                <div key={item._id} className='group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'>
                                    {item.image && (
                                        <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden'>
                                            <Link to={`/edit-post/${item._id}`} ><img src={item.image} alt="Receipt" className='h-full w-full object-cover object-center group-hover:opacity-75' /></Link>
                                        </div>
                                    )}
                                    <div className='p-4'>
                                        <p className='text-sm text-gray-700'>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FormComponent;
