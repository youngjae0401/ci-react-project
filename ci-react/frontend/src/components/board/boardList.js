import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
 
const BoardList = () => {
    const [board, setBoard] = useState([]);
 
    useEffect(() => {
        getProducts();
    },[]);
 
    const getProducts = async () => {
        const list = await axios.get('/board');
        setBoard(list.data);
    }
 
    const deleteProduct = async (id) =>{
        await axios.delete(`/board/${id}`)
        .then(function(response) {
            getProducts();
        }).catch(function(error) {
            alert(error.response.data.messages.error);
        });
    }
 
    return (
        <div>
            {/* <div className="search">
                <div className="input"><input type="text" /></div>
                <div className="btn"><button>검색</button></div>
            </div> */}
            <div className="list">
                <ul>
                    <li>
                        <div className="col">번호</div>
                        <div className="col">제목</div>
                        <div className="col">일자</div>
                        <div className="col"></div>
                    </li>
                    { board.map((data, index) => (
                        <li key={data.id}>
                            <div className="col">{ index + 1 }</div>
                            <div className="col">{ data.title }</div>
                            <div className="col">{ data.created_at }</div>
                            <div className="col btns">
                                <Link to={`/edit/${data.id}`}>수정</Link>
                                <button onClick={() => deleteProduct(data.id)}>삭제</button>
                            </div>
                        </li>
                    )) }
                </ul>
            </div>
            <div className="btns">
                <div>
                    <Link to="/add">글쓰기</Link>
                </div>
            </div>
        </div>
    )
}

export default BoardList;