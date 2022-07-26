import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
 
const EditBoard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
 
    const updateBoard = async (e) => {
        e.preventDefault();
        await axios.patch(`/board/${id}`, {
            title: title,
            content: content
        }).then(function(response) {
            navigate("/");
        }).catch(function(error) {
            alert(error.response.data.messages.error);
        });
    }
 
    useEffect(() => {
        getProductById();
    },[]);
 
    const getProductById = async () => {
        const response = await axios.get(`/board/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
    }
 
    return (
        <div>
            <form className="form" onSubmit={ updateBoard }>
                <div className="field">
                    <label className="label">제목</label>
                    <div className="input">
                        <input 
                            type="text"
                            value={ title } 
                            onChange={ (e) => setTitle(e.target.value) }
                        />
                    </div>
                </div>
                <div className="field top">
                    <label className="label">내용</label>
                    <div className="textarea">
                        <textarea
                            value={ content }
                            maxLength="50"
                            onChange={ (e) => setContent(e.target.value) }
                        >
                        </textarea>
                    </div>
                </div>
                <div className="field right">
                    <button className="button is-primary">수정</button>
                </div>
            </form>
        </div>
    )
}
 
export default EditBoard;