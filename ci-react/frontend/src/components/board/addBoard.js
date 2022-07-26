import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
 
const AddBoard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
 
    const saveBoard = async (e) => {
        e.preventDefault();
        await axios.post('/board', {
            title: title,
            content: content
        }).then(function(response) {
            navigate("/", {replace: true});
        }).catch(function(error) {
            alert(error.response.data.messages.error);
        });
    }
 
    return (
        <div>
            <form className="form" onSubmit={ saveBoard }>
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
                    <button className="button is-primary">저장</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddBoard;